const fs = require('fs')
const pdf = require('html-pdf')
const html = fs.readFileSync('./verify.html', 'utf8')
const options = { format: 'Letter' }

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});




/*
(function () {
    var
     form = $('.form'),
     cache_width = form.width(),
     a4 = [595.28, 841.89]; // for a4 size paper width and height

    document.getElemntById('create_pdf').on('click', function () {
        $('body').scrollTop(0);
        createPDF();
    });
    //create pdf
    function createPDF() {
        getCanvas().then(function (canvas) {
            var
             img = canvas.toDataURL("image/png"),
             doc = new jsPDF({
                 unit: 'px',
                 format: 'a4'
             });
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save('Bhavdip-html-to-pdf.pdf');
            form.width(cache_width);
        });
    }

    // create canvas object
    function getCanvas() {
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true
        });
    }

}());
*/

/*
function print() {
		const filename  = 'ThisIsYourPDFFilename.pdf';

		html2canvas(document.querySelector('#division')).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
			pdf.save(filename);
		});
	}

// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
function print(quality = 1) {
		const filename  = 'ThisIsYourPDFFilename.pdf';

		html2canvas(document.querySelector('#nodeToRenderAsPDF'),
								{scale: quality}
						 ).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
			pdf.save(filename);
		});
	}
*/
