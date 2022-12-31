const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/images')
  },
  filename: (req, file, cb) => {
    // console.log("file=>",file)
    cb(null, Date.now() + path.basename(file.originalname))
  }
})

const upload = multer({ storage: storage })

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", user.create);

  router.post("/profile_update", user.profile_update);
  router.post("/profile_update1", user.profile_update1);
  router.post("/get_all_candidates", user.get_all_candidates);
  router.post("/get_dao_member", user.get_dao_member);
  router.post("/search_votes", user.search_votes);
  router.post("/get_candidate_by_id", user.get_candidate_by_id);
  router.post("/get_dao_member_by_id", user.get_dao_member_by_id);
  router.post("/get_candidate_by_id_1", user.get_candidate_by_id_1);
  router.post("/get_candidate_by_id_111", user.get_candidate_by_id_111);
  router.post("/login", user.login);
  router.post("/cost_vote", user.cost_vote);
  router.post("/status_change", user.status_change);
  router.post("/get_members", user.get_members);
  router.post("/sign_sponsored", user.sign_sponsored);
  router.post("/upload_single_image", user.upload_single_image);
  router.post("/upload_multiple_image", user.upload_multiple_image);

  router.post('/get_candidate_by_metamaskID', user.get_candidate_by_metamaskID)

  router.post('/get_image', user.get_image)

  // app.use("/", user.create);
  // app.use("/profile_update", user.profile_update);
  // app.use("/get_all_candidates", user.get_all_candidates);
  // app.use("/search_votes", user.search_votes);
  // app.use("/get_candidate_by_id", user.get_candidate_by_id);
  // app.use("/login", user.login);
  // app.use("/cost_vote", user.cost_vote);
  // app.use("/status_change", user.status_change);
  // app.use("/get_members", user.get_members);
  // app.use("/sign_sponsored", user.sign_sponsored);

  // router.use(bodyParser.urlencoded({ extended: false }));


  app.use('/new_apis', router);

};