import Urls from '../models/urls.js'

const validateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

export const generateUrl = async (req, res) => {
  try{  const { url } = req.body
  if (!validateUrl(url)) return res.json({ error: 'invalid url' })
  const doc = await Urls.create({original_url: url})
  return res.json({ original_url: doc.original_url, short_url: doc._id});} catch(e) {
    return res.json({error: e.message})
  }
};

export const accessUrl = async (req, res) => {
  try{const {id} = req.params
     const doc = await Urls.findById(id)
      return res.status(301).redirect(doc.original_url)
       } catch(e) {return res.json({error: e.message})}
  
  return res.json({ message: "success" });
};
