# Project: Smart Seating (Умная рассадка)
# Author: Kulikov Alexander (11th Grade Project)
# Date: 16.03.2026
# Python Version: 3.14.2

import flet as ft
import pandas as pd # from pandas import read_csv
import random # from random import shuffle
from dataclasses import dataclass
from typing import List, Tuple, Optional
import tkinter as tk
from tkinter import filedialog

@dataclass
class Student:
    id: int
    name: str
    grade: float

    def __post_init__(self):
        if not (0.0 <= self.grade <= 5.0):
            raise ValueError(f"Некорректный балл для {self.name}: {self.grade}")


class RiskCalculator:
    @staticmethod
    def calculate_knowledge_factor(grade_a: float, grade_b: float) -> float:
        return abs(grade_a - grade_b) / 5.0

    @staticmethod
    def calculate_social_factor(pair: Tuple[str, str], conflicts: List[Tuple[str, str]]) -> float:
        name_a, name_b = pair[0].strip(), pair[1].strip()
        for conflict in conflicts:
            c_a, c_b = conflict[0].strip(), conflict[1].strip()
            if (name_a == c_a and name_b == c_b) or (name_a == c_b and name_b == c_a):
                return 1.0
        return 0.0

    @staticmethod
    def calculate_pair_risk(student_a: Student, student_b: Student, conflicts: List[Tuple[str, str]]) -> float:
        fk = RiskCalculator.calculate_knowledge_factor(student_a.grade, student_b.grade)
        fs = RiskCalculator.calculate_social_factor((student_a.name, student_b.name), conflicts)
        return 0.7 * fk + 0.3 * fs

    @staticmethod
    def get_risk_color(risk: float) -> str:
        if risk < 0.2:
            return "#4CAF50"
        elif risk < 0.5:
            return "#FFEB3B"
        elif risk < 0.8:
            return "#FF9800"
        else:
            return "#F44336"


class SeatingOptimizer:
    ITERATIONS = 10000

    def __init__(self, students: List[Student], rows: int, desks_per_row: int, conflicts: List[Tuple[str, str]]):
        self.students = students
        self.rows = rows
        self.desks_per_row = desks_per_row
        self.conflicts = conflicts
        self.total_seats = rows * desks_per_row * 2
        self.calculator = RiskCalculator()

    def _create_grid(self, student_list: List[Student]) -> List[List[Tuple[Optional[Student], Optional[Student]]]]:
        grid = []
        idx = 0
        for r in range(self.rows):
            row_data = []
            for d in range(self.desks_per_row):
                if idx < len(student_list):
                    left_student = student_list[idx]
                    idx += 1
                else:
                    left_student = None

                if idx < len(student_list):
                    right_student = student_list[idx]
                    idx += 1
                else:
                    right_student = None

                row_data.append((left_student, right_student))
            grid.append(row_data)
        return grid

    def _calculate_score(self, grid: List[List[Tuple[Optional[Student], Optional[Student]]]]) -> Tuple[float, float]:
        total_risk_sum = 0.0
        red_count = 0
        max_risk = 0.0

        for r in range(self.rows):
            for d in range(self.desks_per_row):
                left_student, right_student = grid[r][d]

                if left_student and right_student:
                    risk = self.calculator.calculate_pair_risk(left_student, right_student, self.conflicts)
                    total_risk_sum += risk
                    if risk >= 0.8:
                        red_count += 1
                    if risk > max_risk:
                        max_risk = risk

                current_students = [s for s in [left_student, right_student] if s]

                if d + 1 < self.desks_per_row:
                    neighbor_left, neighbor_right = grid[r][d + 1]
                    neighbor_students = [s for s in [neighbor_left, neighbor_right] if s]

                    for curr_student in current_students:
                        for neighbor_student in neighbor_students:
                            risk = self.calculator.calculate_pair_risk(curr_student, neighbor_student, self.conflicts)
                            total_risk_sum += risk
                            if risk >= 0.8:
                                red_count += 1
                            if risk > max_risk:
                                max_risk = risk

                if r + 1 < self.rows:
                    neighbor_left, neighbor_right = grid[r + 1][d]
                    neighbor_students = [s for s in [neighbor_left, neighbor_right] if s]

                    for curr_student in current_students:
                        for neighbor_student in neighbor_students:
                            risk = self.calculator.calculate_pair_risk(curr_student, neighbor_student, self.conflicts)
                            total_risk_sum += risk
                            if risk >= 0.8:
                                red_count += 1
                            if risk > max_risk:
                                max_risk = risk

        score = (red_count * 1000) + total_risk_sum
        return score, max_risk

    def optimize(self) -> Tuple[List[List[Tuple[Optional[Student], Optional[Student]]]], float]:
        best_grid = None
        best_score = float('inf')
        best_max_risk = 0.0
        student_pool = self.students.copy()

        for i in range(self.ITERATIONS):
            random.shuffle(student_pool)
            current_grid = self._create_grid(student_pool)
            score, max_r = self._calculate_score(current_grid)

            if score < best_score:
                best_score = score
                best_grid = current_grid
                best_max_risk = max_r

        return best_grid, best_max_risk


def main(page: ft.Page):
    page.title = "Умная рассадка v1.0"
    page.theme_mode = ft.ThemeMode.LIGHT
    page.window_width = 1200
    page.window_height = 700

    students_data: List[Student] = []

    txt_rows = ft.TextField(label="Парт в ряду", value="5", width=150, keyboard_type=ft.KeyboardType.NUMBER)
    txt_desks = ft.TextField(label="Количество рядов", value="3", width=150, keyboard_type=ft.KeyboardType.NUMBER)

    txt_conflicts = ft.TextField(
        label="Конфликтные пары (Фамилия;Фамилия на 1 строке)",
        multiline=True,
        min_lines=5,
        expand=True,
        hint_text="Иванов;Петров\nСидоров;Кузнецов"
    )

    lbl_status = ft.Text("Статус: Ожидание данных...", color=ft.Colors.GREY_700)
    lbl_score = ft.Text("Лучший риск: -", size=18, weight=ft.FontWeight.BOLD)

    grid_container = ft.Container(
        content=ft.Column(scroll=ft.ScrollMode.AUTO),
        expand=True,
        padding=10
    )

    def load_csv(file_path: str):
        try:
            df = pd.read_csv(file_path, sep=';', header=None, names=['name', 'grade'])
            students_data.clear()
            for idx, row in df.iterrows():
                try:
                    s = Student(id=idx, name=str(row['name']), grade=float(row['grade']))
                    students_data.append(s)
                except ValueError as ve:
                    lbl_status.value = f"Ошибка в строке {idx}: {ve}"
                    lbl_status.color = ft.Colors.RED
                    page.update()
                    return

            lbl_status.value = f"Загружено учеников: {len(students_data)}"
            lbl_status.color = ft.Colors.GREEN
            page.update()

        except Exception as ex:
            lbl_status.value = f"Ошибка чтения файла: {ex}"
            lbl_status.color = ft.Colors.RED
            page.update()

    def parse_conflicts() -> List[Tuple[str, str]]:
        raw_text = txt_conflicts.value
        conflicts = []
        if not raw_text:
            return conflicts

        lines = raw_text.strip().split('\n')
        for line in lines:
            if ';' in line:
                parts = line.split(';')
                if len(parts) >= 2:
                    conflicts.append((parts[0].strip(), parts[1].strip()))
        return conflicts

    def run_optimization(e):
        if not students_data:
            lbl_status.value = "Ошибка: Сначала загрузите учеников!"
            lbl_status.color = ft.Colors.RED
            page.update()
            return

        try:
            desks_per_row = int(txt_desks.value)
            rows = int(txt_rows.value)
        except ValueError:
            lbl_status.value = "Ошибка: Укажите корректные числа рядов и мест."
            lbl_status.color = ft.Colors.RED
            page.update()
            return

        total_seats = rows * desks_per_row * 2
        if len(students_data) > total_seats:
            lbl_status.value = f"Внимание: Мест ({total_seats}) меньше, чем учеников ({len(students_data)})!"
            lbl_status.color = ft.Colors.ORANGE
        else:
            lbl_status.value = "Оптимизация завершена."
            lbl_status.color = ft.Colors.GREEN

        conflicts_list = parse_conflicts()
        optimizer = SeatingOptimizer(students_data, rows, desks_per_row, conflicts_list)
        best_grid, max_risk = optimizer.optimize()

        grid_container.content.controls.clear()

        for r_idx, row in enumerate(best_grid):
            row_controls = ft.Row(spacing=15)
            for desk_idx, (left_student, right_student) in enumerate(row):
                desk_container = ft.Container(
                    padding=5,
                    border=ft.Border.all(2, ft.Colors.GREY_400),
                    border_radius=8,
                    bgcolor=ft.Colors.WHITE
                )

                if left_student:
                    local_max_risk = 0.0
                    if right_student:
                        risk = RiskCalculator.calculate_pair_risk(left_student, right_student, conflicts_list)
                        local_max_risk = max(local_max_risk, risk)

                    if desk_idx > 0:
                        prev_left, prev_right = best_grid[r_idx][desk_idx - 1]
                        for neighbor in [prev_left, prev_right]:
                            if neighbor:
                                risk = RiskCalculator.calculate_pair_risk(left_student, neighbor, conflicts_list)
                                local_max_risk = max(local_max_risk, risk)

                    if r_idx > 0:
                        above_left, above_right = best_grid[r_idx - 1][desk_idx]
                        for neighbor in [above_left, above_right]:
                            if neighbor:
                                risk = RiskCalculator.calculate_pair_risk(left_student, neighbor, conflicts_list)
                                local_max_risk = max(local_max_risk, risk)

                    left_color = RiskCalculator.get_risk_color(local_max_risk)

                    left_seat = ft.Container(
                        width=100,
                        height=70,
                        bgcolor=left_color,
                        border_radius=5,
                        alignment=ft.alignment.Alignment.CENTER,
                        tooltip=f"{left_student.name}\nБалл: {left_student.grade}\nРиск: {int(local_max_risk * 100)}%",
                        content=ft.Column(
                            alignment=ft.MainAxisAlignment.CENTER,
                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                            controls=[
                                ft.Text(left_student.name.split()[0], size=11, weight=ft.FontWeight.BOLD),
                                ft.Text(f"{left_student.grade} ({int(local_max_risk * 100)}%)", size=9, color=ft.Colors.BLACK54)
                            ]
                        )
                    )
                else:
                    left_seat = ft.Container(
                        width=100,
                        height=70,
                        bgcolor=ft.Colors.GREY_200,
                        border_radius=5,
                        alignment=ft.alignment.Alignment.CENTER,
                        content=ft.Text("—", size=16, color=ft.Colors.GREY_400)
                    )

                if right_student:
                    local_max_risk = 0.0
                    if left_student:
                        risk = RiskCalculator.calculate_pair_risk(right_student, left_student, conflicts_list)
                        local_max_risk = max(local_max_risk, risk)

                    if desk_idx > 0:
                        prev_left, prev_right = best_grid[r_idx][desk_idx - 1]
                        for neighbor in [prev_left, prev_right]:
                            if neighbor:
                                risk = RiskCalculator.calculate_pair_risk(right_student, neighbor, conflicts_list)
                                local_max_risk = max(local_max_risk, risk)

                    if r_idx > 0:
                        above_left, above_right = best_grid[r_idx - 1][desk_idx]
                        for neighbor in [above_left, above_right]:
                            if neighbor:
                                risk = RiskCalculator.calculate_pair_risk(right_student, neighbor, conflicts_list)
                                local_max_risk = max(local_max_risk, risk)

                    right_color = RiskCalculator.get_risk_color(local_max_risk)

                    right_seat = ft.Container(
                        width=100,
                        height=70,
                        bgcolor=right_color,
                        border_radius=5,
                        alignment=ft.alignment.Alignment.CENTER,
                        tooltip=f"{right_student.name}\nБалл: {right_student.grade}\nРиск: {int(local_max_risk * 100)}%",
                        content=ft.Column(
                            alignment=ft.MainAxisAlignment.CENTER,
                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                            controls=[
                                ft.Text(right_student.name.split()[0], size=11, weight=ft.FontWeight.BOLD),
                                ft.Text(f"{right_student.grade} ({int(local_max_risk * 100)}%)", size=9, color=ft.Colors.BLACK54)
                            ]
                        )
                    )
                else:
                    right_seat = ft.Container(
                        width=100,
                        height=70,
                        bgcolor=ft.Colors.GREY_200,
                        border_radius=5,
                        alignment=ft.alignment.Alignment.CENTER,
                        content=ft.Text("—", size=16, color=ft.Colors.GREY_400)
                    )

                desk_container.content = ft.Row(
                    [left_seat, right_seat],
                    spacing=5,
                    alignment=ft.MainAxisAlignment.CENTER
                )

                row_controls.controls.append(desk_container)

            grid_container.content.controls.append(row_controls)

        final_score, _ = optimizer._calculate_score(best_grid)
        lbl_score.value = f"Итоговый результат: {final_score:.2f} (Максимальный индивидуальный риск: {int(max_risk * 100)}%)"
        page.update()

    def pick_files(e):
        root = tk.Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
        root.destroy()

        if file_path:
            load_csv(file_path)

    left_panel = ft.Container(
        width=300,
        padding=20,
        content=ft.Column(
            controls=[
                ft.Text("Настройки", size=20, weight=ft.FontWeight.BOLD),
                ft.Divider(),
                txt_desks,
                txt_rows,
                ft.Text("Парт в ряду (по 2 места)", size=11, color=ft.Colors.GREY_600),
                ft.Button(
                    "Загрузить учеников (CSV)",
                    on_click=pick_files
                ),
                ft.Text("Конфликтные пары:", weight=ft.FontWeight.BOLD),
                txt_conflicts,
                ft.Divider(),
                ft.Button(
                    "Оптимизировать рассадку",
                    style=ft.ButtonStyle(bgcolor=ft.Colors.BLUE_700, color=ft.Colors.WHITE),
                    on_click=run_optimization
                ),
                ft.Divider(),
                lbl_status,
                lbl_score
            ],
            spacing=15
        )
    )

    right_panel = ft.Container(
        expand=True,
        padding=20,
        content=grid_container,
        bgcolor=ft.Colors.WHITE
    )

    page.add(ft.Row([left_panel, right_panel], expand=True))


if __name__ == "__main__":
    ft.run(main)