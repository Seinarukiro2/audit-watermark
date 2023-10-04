
import os
import shutil

from docx import Document

def process_docx(custom_values):
    print(custom_values)
    if custom_values['question1'] == 'English':
        doc_filename = "nda_eng.docx"
    elif custom_values['question1'] == 'Deutsch':
        doc_filename = "nda_deu.docx"
    else:
        raise ValueError("Unsupported language")
    print('1')
    doc = Document(doc_filename)
    print('1')
    # Проходим по всем абзацам в документе
    for paragraph in doc.paragraphs:
            paragraph.text = paragraph.text.replace("company_name", custom_values['address']['companyName'])
            paragraph.text = paragraph.text.replace("street_num", custom_values['address']['streetNumber'])
            paragraph.text = paragraph.text.replace("zip_city", custom_values['address']['zipCodeCity'])
    print('1')
    # Создаем новое имя файла для сохранения измененного документа
    output_filename = "processed_" + doc_filename
    print('1')
    # Сохраняем измененный документ
    doc.save(output_filename)
    print('1')
    # Возвращаем имя сохраненного файла
    return output_filename


