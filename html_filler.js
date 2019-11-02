const QRReader = require('qrcode-reader');
const fs = require('fs');
const jimp = require('jimp');

results = run().catch(error => console.error(error.stack));

async function run() {
  const img = await jimp.read(fs.readFileSync('./sanpellegrino.png'));

  const qr = new QRReader();

  // qrcode-reader's API doesn't support promises, so wrap it
  const value = await new Promise((resolve, reject) => {
    qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });


  // Result of QR code
  console.log(value.result);

  var i;
  var dict = {}
  results = value.result.toString()
  results_list = results.split("\n")

  console.log(results_list)

  for (i = 0; i < results_list.length; i++) {
    current_entry = results_list[i]
    key_and_values = current_entry.split(":")
    dict[key_and_values[0]] = key_and_values[1]
  }

  console.log(dict)

  document.getElementById('Exp_Date').value = dict['expiration_date']
  document.getElementById('Description').value = dict['description']
  document.getElementById('Shipment_Date').value = dict['date_of_shipment']
  document.getElementById('Supplier').value = dict['supplier']
  document.getElementById('Quantity').value = dict['quantity']
  document.getElementById('Item_Name').value = dict['item_name']
  document.getElementById('Flavour').value = dict['flavour']
}


