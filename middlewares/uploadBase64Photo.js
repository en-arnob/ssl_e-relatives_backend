const fs = require('fs');

exports.uploadBase64Photo = async (req, res) => {
  try {
    const base64Data = req.body.imgSrc;

    // console.log(base64Data);

    const base64Image = base64Data.split(';base64,').pop();
    const filename = 'user' + '-' + Date.now() + '.jpg';
    const path = './uploads/users/' + filename;
    // const base64Image = base64Data.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(path, base64Image, {
      encoding: 'base64',
    });

    return res.send(filename);
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while updating the User Photo.',
      res
    );
  }
};
