import { PDFDocument, rgb } from 'pdf-lib';

interface WatermarkPosition {
    x: number;
    y: number;
}

async function createWatermarkedPDF(inputPDF: File, customerName: string): Promise<Uint8Array> {
    try {
        // Преобразуем загруженный PDF в объект PDFDocument
        const pdfBytes = await inputPDF.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Создаем водяной знак
        const watermarkText = `${customerName}`;

        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const page = pdfDoc.getPage(i);

            const { width, height } = page.getSize();
            const fontSize = 30;

            // Определение максимальных координат (X, Y), чтобы водяной знак не выпадал за границы страницы
            const maxX = width - fontSize * watermarkText.length * 0.65; // Учтите ширину текста
            const maxY = height - fontSize;

            const numWatermarks = 5; // Количество водяных знаков на странице
            const minDistance = 40; // Минимальное расстояние между водяными знаками

            const watermarkPositions: WatermarkPosition[] = [];

            // Генерация уникальных позиций для водяных знаков
            for (let j = 0; j < numWatermarks; j++) {
                let x: number, y: number;

                do {
                    x = Math.random() * maxX; // Случайная X-координата
                    y = Math.random() * maxY; // Случайная Y-координата
                } while (
                    watermarkPositions.some(
                        (position) =>
                            Math.abs(x - position.x) < minDistance && Math.abs(y - position.y) < minDistance
                    )
                    );

                watermarkPositions.push({ x, y });

                page.drawText(watermarkText, {
                    x,
                    y,
                    size: fontSize,
                    color: rgb(226 / 255, 0, 116 / 255), // Цвет: #e20074
                    opacity: 0.3, // Прозрачность
                });
            }
        }

        // Преобразуем обновленный PDF в массив байтов
        const modifiedPdfBytes = await pdfDoc.save();

        return modifiedPdfBytes;
    } catch (error) {
        throw error;
    }
}

export { createWatermarkedPDF };
