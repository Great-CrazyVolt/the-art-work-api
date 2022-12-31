const User = require("../models/user.model.js");
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    // console.log("file=>",file)
    cb(null, Date.now() + path.basename(file.originalname))
  }
})

const upload = multer({ storage: storage }).single('image')
const upload1 = multer({ storage: storage }).array('image', 12)

exports.upload_single_image = (req, res) => {

  upload(req, res, function (err) {
    if (err) {
      return res.status(200).send("error", (err).toString());
    }
    let resp = {
      'response': req.file['filename']
    }
    res.send(JSON.stringify(req.file['filename']));
  })


};
exports.upload_multiple_image = (req, res) => {

  upload1(req, res, function (err) {
    if (err) {
      return res.send("uploadedd =>", err)
    }
    let names = "";
    for (let index = 0; index < req.files.length; index++) {
      let name = req.files[index]["filename"]
      names += name + ",";
    }
    //   res.send(names)
    let resp = {
      'response': names
    }
    res.send(JSON.stringify(names));
  })


};

exports.get_image = (req, res) => {
  const imageName = req.body.imageName

  res.sendFile(path.join(__dirname, './images/'+imageName));
}

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const metamaskID = req.body.metamaskID;
  // const password = req.body.password;


  // Save Customer in the database
  User.create(metamaskID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.profile_update = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const company_name = req.body.company_name;
  const description = req.body.description;
  const phone = req.body.phone;
  const postal_address = req.body.postal_address;
  const web_link = req.body.web_link;
  const profile_image = req.body.profile_image;
  const job = req.body.job;
  const date = req.body.date;
  const sponsord1 = req.body.sponsord1;
  const sponsord2 = req.body.sponsord2;
  const email = req.body.email
  const login_email = req.body.login_email;
  User.profileupdate(id, name, company_name, description, phone, postal_address, web_link, profile_image, job, date, sponsord1, sponsord2, email, login_email,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customers."
        });
      else res.send(data);
    });
};
exports.profile_update1 = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const company_name = req.body.company_name;
  const description = req.body.description;
  const phone = req.body.phone;
  const postal_address = req.body.postal_address;
  const web_link = req.body.web_link;
  const profile_image = req.body.profile_image;
  const job = req.body.job;
  const date = req.body.date;
  const sponsord1 = req.body.sponsord1;
  const sponsord2 = req.body.sponsord2;
  const email = req.body.email
  const login_email = req.body.login_email
  User.profileupdate1(id, name, company_name, description, phone, postal_address, web_link, profile_image, job, date, sponsord1, sponsord2, email, login_email,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customers."
        });
      else res.send(data);
    });
};
exports.get_all_candidates = (req, res) => {

  User.getallcandidates((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.get_dao_member = (req, res) => {

  User.getdaomember((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.get_dao_member_by_id = (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user_id;
  User.getdaomemberbyid(id, user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.search_votes = (req, res) => {
  const search = req.body.search;

  User.searchvotes(search, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};

exports.get_candidate_by_metamaskID = (req, res) => {
  const metamaskId = req.body.metamaskId;

  User.getCandidateByMetaMask(metamaskId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  })
}

exports.get_candidate_by_id = (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user_id;
  User.getcandidatebyid(id, user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.get_candidate_by_id_1 = (req, res) => {
  const metamaskID = req.body.metamaskID;

  User.getcandidatebyid1(metamaskID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};

exports.get_candidate_by_id_111 = (req, res) => {
  const metamaskID = req.body.metamaskID;

  User.getcandidatebyid111(metamaskID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};


exports.get_members = (req, res) => {

  User.getmembers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.login = (req, res) => {
  const metamaskID = req.body.metamaskID;

  // const email = req.body.email;
  // const password = req.body.password;

  console.log("req=>", req);
  User.login(metamaskID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.cost_vote = (req, res) => {
  const candidate_id = req.body.candidate_id;
  const member_id = req.body.member_id;
  const vote = req.body.vote;
  console.log("req=>", req);
  User.costvote(candidate_id, member_id, vote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.status_change = (req, res) => {
  const metamaskID = req.body.metamaskID;
  const member = req.body.member;

  console.log("req=>", req);
  User.statuschange(metamaskID, member, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
exports.sign_sponsored = (req, res) => {
  const id = req.body.id;
  const no = req.body.no;

  console.log("req=>", req);
  User.signsponsored(id, no, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};
