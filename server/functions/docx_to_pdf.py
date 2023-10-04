import subprocess
import os

def convert_docx_to_pdf(filename):
    try:
        # Конвертируем .docx в .pdf с помощью abiword
        subprocess.run(['abiword', '--to=pdf', filename])

        # Определяем имя файла без расширения
        base_name = os.path.splitext(filename)[0]

        # Удаляем оригинальный .docx файл
        os.remove(filename)

        # Возвращаем имя PDF файла
        pdf_filename = base_name + '.pdf'
        return pdf_filename

    except Exception as e:
        return str(e)