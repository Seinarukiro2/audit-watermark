
from pypdf import PdfReader, PdfWriter

def edit_nda(custom_values):
    if custom_values["question1"] == "Deutsch":
        if custom_values["question2"] == "TDG":
            template_file = "DE_TDG.pdf"
        elif custom_values["question2"] == "TSI":
            template_file = "DE_TSI.pdf"
        template_file = "DE_TSI.pdf"
    elif custom_values["question1"] == "English":
        if custom_values["question2"] == "TDG":
            template_file = "EN_TDG.pdf"
        elif custom_values["question2"] == "TSI":
            template_file = "EN_TSI.pdf"
    else:
        raise ValueError("Parameters is not correct TSI/DE/TDG/EN")
    
    reader = PdfReader(template_file)
    writer = PdfWriter()

    writer.append(reader)

    writer.update_page_form_field_values(
        writer.pages[0], {"name": custom_values['address']['companyName'], "street": custom_values['address']['streetNumber'], "city": custom_values['address']['zipCodeCity']}
    )


    writer.encrypt(user_password='', owner_password='test_pwd', permissions_flag=0b0100)
    # write "output" to pypdf-output.pdf
    file_name = "last_filled_nda.pdf"
    with open(file_name, "wb") as output_stream:
        writer.write(output_stream)
    
    return file_name

def edit_rda(custom_values):
    if custom_values["question1"] == "Deutsch":
        template_file = "RDA_DE.pdf"
    elif custom_values["question1"] == "English":
        template_file = "RDA_EN.pdf"
    else:
        raise ValueError("Parameters is not correct")
    
    reader = PdfReader(template_file)
    writer = PdfWriter()

    writer.append(reader)
    
    address = custom_values["address"]["streetNumber"]}
    city = custom_values["address"]["zipCodeCity"]

    writer.update_page_form_field_values(
        writer.pages[0], {"reference": custom_values['address']['companyName'], 
        "contact": f"{contact}, {city}",
        "phone": custom_values["telefonnummer"],
        "date": custom_values["selectedDate"]}
    )
    writer.encrypt(user_password='', owner_password='test_pwd', permissions_flag=0b0100)
    # write "output" to pypdf-output.pdf
    file_name = "last_filled_nda.pdf"
    with open(file_name, "wb") as output_stream:
        writer.write(output_stream)
    
    return file_name
    

