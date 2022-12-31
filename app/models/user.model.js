const sql = require("./db.js");

// constructor
const User = function (User) {

  this.metamaskID = User.metamaskID;
  // this.password = User.password;
  // this.email = User.email;

};

User.create = (metamaskID, result) => {
  let query = `select * from candidates where metamaskID = "${metamaskID}" `;
  let status = '';
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length != 0) {
      console.log("Users1:=> ", res);
      let resp = {
        // 'response': 'User with this metamask ID already exist'
        'response': res
      }
      result(null, resp);
      return;
    }
    else {
      // let query1 = `INSERT INTO p_users(first_name, last_name, email, phone, password, mobile_code, email_code) VALUES ('${fname}','${lname}','${email}','${phone}','${password}','${mobilecode}','${emailcode}')`;
      sql.query(`INSERT INTO candidates(metamaskID, status) VALUES ('${metamaskID}', '${status}')`, (err, res1) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        sql.query(`INSERT INTO dao_members(metamaskID, status) VALUES ('${metamaskID}','${status}')`, (err, res1) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          // if (res.length !== 0) {
          //   sql.query(`UPDATE dao_members SET type = 'Member' where ID = 1 `, (err, res) => {
          //     if (err) {
          //       console.log("error: ", err);
          //       result(query, null);
          //       return;
          //     }
          //   })
          // }
        })
        sql.query(`select * from candidates where metamaskID = "${metamaskID}" `, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(query, null);
            return;
          }

          if (res.length !== 0) {
            console.log("found User: ", res[0]);
            let resp = {
              'response': res
            }
            result(null, resp);

            return;
          }
          else {
            // console.log("found User: ", res[0]);
            let resp = {
              'response': 'fail'
            }
            result(null, resp);


            return;

          }

          // not found User with the id

        });
        // result(null, res1);
      })
    }

  });
};
User.profileupdate = (id, name, company_name, description, phone, postal_address, web_link, profile_image, job, date, sponsord1, sponsord2, email, login_email, result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  let status = 'Active';
  let status1 = 'Closed';
  let type1 = 'Member';
  var moment = require('moment');
  var date1 = moment().format('MM-DD-YYYY h:mm:ss a');
  sql.query(`UPDATE candidates SET name='${name}',new_email='${email}',company_name='${company_name}',phone='${phone}',web_link='${web_link}',postal_address='${postal_address}',description='${description}',job='${job}',profile_image='${profile_image}',status='${status}',date='${date1}',sponsored_by_1='${sponsord1}',sponsored_by_2='${sponsord2}' WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    sql.query(`UPDATE dao_members SET name='${name}',new_email='${email}',company_name='${company_name}',phone='${phone}',web_link='${web_link}',postal_address='${postal_address}',description='${description}',job='${job}',profile_image='${profile_image}',status='${status1}',date='${date1}',type='${type1}',sponsored_by_1='${sponsord1}',sponsored_by_2='${sponsord2}' WHERE email='${login_email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    })
    if (id == 1) {
      sql.query(`UPDATE candidates SET type = 'Member', status = 'Closed' where id = 1 `, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(query, null);
          return;
        }
      })
    }
    sql.query(`select * from candidates where id='${id}'`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(query, null);
        return;
      }
      result(null, res1);
      return;
    });

    //   result(null, res);
    //   return;
    // not found User with the id
    // result({ kind: "not_found" }, null);
  });





};
User.profileupdate1 = (id, name, company_name, description, phone, postal_address, web_link, profile_image, job, date, sponsord1, sponsord2, email, login_email, result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  let status = 'Active';


  sql.query(`UPDATE candidates SET company_name='${company_name}',new_email='${email}',phone='${phone}',web_link='${web_link}',postal_address='${postal_address}',description='${description}',job='${job}',profile_image='${profile_image}' WHERE email='${login_email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    sql.query(`select * from candidates where email='${login_email}'`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(query, null);
        return;
      }
      result(null, res1);
      return;
      //       let resp={
      //       'response':phone
      //   }
      //   result(null, resp);


      //     return;
    });

    //   result(null, res);
    //   return;
    // not found User with the id
    // result({ kind: "not_found" }, null);
  });





};
User.signsponsored = (id, no, result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  let status = 'true';
  if (no == 1) {
    sql.query(`UPDATE candidates SET sponsored_1_check='${status}' WHERE id=${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(query, null);
        return;
      }


      result(null, res);
      return;

    });
  }
  else {
    sql.query(`UPDATE candidates SET sponsored_2_check='${status}' WHERE id=${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(query, null);
        return;
      }


      result(null, res);
      return;

    });
  }



};
User.getallcandidates = (result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  var moment = require('moment');
  var date1 = moment().format('MM-DD-YYYY h:mm:ss a');
  sql.query(`select c.*,(select count(id)  from votes  where candidate_id=c.id and vote='For') as total_for,(select count(id)  from votes  where candidate_id=c.id and vote='Against') as total_against from candidates c order by c.date desc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    let resp = {

      'response': res,
      'date': date1,
    }
    result(null, resp);
    return;

  });
};
User.getdaomember = (result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  sql.query('SELECT c.ID, c.metamaskID, c.name, c.company_name, c.job, c.sponsored_by_1, c.sponsored_by_2, c.sponsored_1_check, c.sponsored_2_check, c.status, c.date,  c.profile_image , c.type FROM candidates as c INNER JOIN dao_members as d ON c.metamaskID = d.metamaskID', (err, res) => {
    // sql.query(`select m.company_name,m.new_email,m.email,m.phone,m.web_link,m.postal_address,m.description,m.job,m.profile_image,m.status,m.type,c.metamaskID,c.password,c.sponsored_by_1,c.sponsored_by_2,c.sponsored_1_check,c.sponsored_2_check,c.date,(select count(id)  from votes  where candidate_id=c.id and vote='For') as total_for,(select count(id)  from votes  where candidate_id=c.id and vote='Against') as total_against from candidates c inner join dao_members m on c.metamaskID=m.metamaskID where c.type='Member' order by c.date desc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let resp = {

      'response': res
    }
    result(null, resp);
    return;

  });
};
User.getdaomemberbyid = (id, user_id, result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  sql.query(`select m.company_name,m.email,m.new_email,m.phone,m.web_link,m.postal_address,m.description,m.job,m.profile_image,m.status,m.type,c.id,c.name,c.password,c.sponsored_by_1,c.sponsored_by_2,c.sponsored_1_check,c.sponsored_2_check,c.date c.profile_image,(select id  from votes  where candidate_id=c.id and member_id='${user_id}') as my_vote,(select count(id)  from votes  where candidate_id=c.id and vote='For') as total_for,(select count(id)  from votes  where candidate_id=c.id and vote='Against') as total_against from candidates c inner join dao_members m on c.email=m.email where c.type='Member' and c.id=${id} order by c.id desc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let resp = {

      'response': res
    }
    result(null, resp);
    return;

  });
};
User.searchvotes = (search, result) => {


  sql.query(`select * from candidates where name LIKE '%${search}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    let resp = {

      'response': res
    }
    result(null, resp);
    return;


  });





};

User.getCandidateByMetaMask = (metamaskId, result) => {
  sql.query(`SELECT * FROM candidates where metamaskId = " ${metamaskId}" `, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(query, null);
      return;
    }

    let resp = {

      'response': res,
    }
    result(null, resp);
    return;

  })

}

User.getcandidatebyid = (id, user_id, result) => {

  var moment = require('moment');
  var date1 = moment().format('MM-DD-YYYY h:mm:ss a');
  sql.query(`select c.*,(select id  from votes  where candidate_id=c.id and member_id='${user_id}') as my_vote,(select count(id)  from votes  where candidate_id=c.id and vote='For') as total_for,(select count(id)  from votes  where candidate_id=c.id and vote='Against') as total_against,(select count(id)  from votes  where candidate_id=c.id) as all_votes from candidates c where  c.id=${id} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(query, null);
      return;
    }

    let resp = {

      'response': res,
      'date': date1
    }
    result(null, resp);
    return;


  });





};
User.getcandidatebyid1 = (metamaskID, result) => {


  sql.query(`select c.* from dao_members c where  c.metamaskID='${metamaskID}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    let resp = {

      'response': res
    }
    result(null, resp);
    return;


  });
};

User.getcandidatebyid111 = (metamaskID, result) => {


  sql.query(`select c.* from candidates c where  c.metamaskID='${metamaskID}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    let resp = {

      'response': res
    }
    result(null, resp);
    return;


  });
};

User.getmembers = (result) => {


  sql.query(`select id, name, profile_image from candidates where type='Member' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(query, null);
      return;
    }

    let resp = {

      'response': res
    }
    result(null, resp);
    return;


  });





};
User.login = (metamaskID, result) => {
  // let query = `SELECT * FROM users WHERE id = ${id}`;
  sql.query(`select * from candidates where metamaskID= " ${metamaskID}" `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(query, null);
      return;
    }

    if (res.length !== 0) {
      console.log("found User: ", res[0]);
      let resp = {
        'response': res
      }
      result(null, resp);


      return;

    }
    else {
      // console.log("found User: ", res[0]);
      let resp = {
        'response': 'fail'
      }
      result(null, resp);


      return;

    }

    // not found User with the id

  });
};

User.costvote = (candidate_id, member_id, vote, result) => {




  // let query1 = `INSERT INTO p_users(first_name, last_name, email, phone, password, mobile_code, email_code) VALUES ('${fname}','${lname}','${email}','${phone}','${password}','${mobilecode}','${emailcode}')`;
  sql.query(`INSERT INTO votes (candidate_id, member_id, vote) VALUES ('${candidate_id}','${member_id}','${vote}')`, (err, res1) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    let resp = {
      'response': 'success'
    }
    result(null, resp);


    return;
    // result(null, res1);
  })

};
User.statuschange = (metamaskID, member, result) => {
  
  let status = 'Closed';
  // let query1 = `INSERT INTO p_users(first_name, last_name, email, phone, password, mobile_code, email_code) VALUES ('${fname}','${lname}','${email}','${phone}','${password}','${mobilecode}','${emailcode}')`;
  sql.query(`UPDATE candidates SET status='${status}',type='${member}' where metamaskID=${metamaskID}`, (err, res1) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    let resp = {
      'response': 'success'
    }
    result(null, resp);


    return;
    // result(null, res1);
  })

};



module.exports = User;
