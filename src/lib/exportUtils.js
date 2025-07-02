
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Exportar para PDF
export const exportToPDF = async (content, fileName, isPremium = false) => {
  try {
    // Criar elemento temporário para renderização
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.replace(/\n/g, '<br>');
    tempDiv.style.cssText = `
      position: absolute;
      left: -9999px;
      top: -9999px;
      width: 800px;
      padding: 40px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #333;
      background: white;
    `;
    
    // Adicionar marca d'água se for usuário free
    if (!isPremium) {
      const watermark = document.createElement('div');
      watermark.innerHTML = 'Gerado por LegalGen Pro - Versão Gratuita';
      watermark.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 10px;
        color: #999;
        opacity: 0.7;
      `;
      tempDiv.appendChild(watermark);
    }
    
    document.body.appendChild(tempDiv);
    
    // Converter para canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    // Remover elemento temporário
    document.body.removeChild(tempDiv);
    
    // Criar PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Baixar arquivo
    pdf.save(`${fileName || 'documento'}.pdf`);
    
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw new Error('Falha ao gerar PDF');
  }
};

// Exportar para HTML
export const exportToHTML = (content, fileName, isPremium = false) => {
  try {
    let htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName || 'Documento Legal'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
        }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        h3 { color: #7f8c8d; }
        p { margin-bottom: 15px; }
        ul, ol { margin-bottom: 15px; padding-left: 30px; }
        .watermark {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            color: #999;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    ${content.replace(/\n/g, '<br>')}
    ${!isPremium ? '<div class="watermark">Gerado por LegalGen Pro - Versão Gratuita</div>' : ''}
</body>
</html>`;

    // Criar blob e baixar
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName || 'documento'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Erro ao exportar HTML:', error);
    throw new Error('Falha ao gerar HTML');
  }
};

// Função para preview do documento
export const generatePreview = (content, isPremium = false) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      ${content.replace(/\n/g, '<br>')}
      ${!isPremium ? '<div style="position: fixed; bottom: 20px; right: 20px; font-size: 12px; color: #999; opacity: 0.7;">Gerado por LegalGen Pro - Versão Gratuita</div>' : ''}
    </div>
  `;
};
