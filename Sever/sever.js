const express = require("express");
const app = express();
const port = 4000;
var bodyParser = require('body-parser')
var cosr = require('cors');
var mysql = require("mysql");
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var md5 = require('md5');


app.use('/upload', express.static('./upload'))
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "duanreact.sql",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


let linkimg = null;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'upload')
    },
    filename: (req, file, callBack) => {
      linkimg = Date.now() + '.jpg';
      console.log(linkimg);
		callBack(null, linkimg)
       // callBack(null, imgname+`${file.originalname}`)
    }
  })
let upload = multer({ storage: storage})

//end upload 
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
   const file = req.file;
   console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
  })
//end upload 


// trang homeNP
app.get("/home", (req, res) => {
  res.send("Hello World!");
});
// hiển thị ds bảng sv
app.get("/dsdm", (req, res) => {
  con.query("SELECT * FROM danhmuc ORDER BY iddm desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});


app.post('/timsanpham', function (req, res) {
  console.log(req.body.namesptim);
 
  

});




// hiển thị ds bảng sv
// app.get("/dssp", (req, res) => {
//   con.query("SELECT * FROM sanpham ORDER BY masp desc", function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });


// hiển thị ds bảng sanpham gio hang
app.get("/dsgiohang/:masp", (req, res) => {

  con.query("SELECT * FROM sanpham WHERE masp =" + req.params.masp, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// hiển thị ds bảng sv theo khoảng id
app.get("/dssp/:masp", (req, res) => {
    var limit = 6;
	var ofsset = (req.params.masp -1) * limit;
	var sql = "SELECT * FROM sanpham ORDER BY masp desc LIMIT " + ofsset + " , "+ limit ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/dssp1/:masp", (req, res) => {
  var limit = 4;
  console.log(req.params.masp);
var ofsset = (req.params.masp -1) * limit;
var sql = "SELECT * FROM sanpham ORDER BY masp desc LIMIT " + ofsset + " , "+ limit ;
con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.send(result);
});
});

// hiển thị ds bảng sv theo khoảng id
app.get("/dsdm/:iddm", (req, res) => {
  var limit = 5; 
	var ofsset = (req.params.iddm -1) * limit;
	var sql = "SELECT * FROM danhmuc ORDER BY iddm desc LIMIT " + ofsset + " , "+ limit ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// post
app.post('/adddanhmuc', (req, res) => {
    console.log(req.body.ten)
    console.log(req.body.tuoi)
    console.log(req.body.diachi)
  
    var sql = "insert into danhmuc ( tendm, idcha) values('"+ req.body.namcate +"','"+ req.body.idcha +"');";
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  app.get('/suaDanhMuc/:idsp', function (req, res) {
    var page = req.params.idsp;
    
    var sql = "SELECT * FROM danhmuc WHERE iddm = " + page;
    con.query(sql , function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
  
      res.send(result);
      });
  });
   
  


  app.post('/addsanpham', (req, res) => {
    console.log(req.body.ten)
    console.log(req.body.tuoi)
    console.log(req.body.diachi)
  
    var sql = "insert into sanpham ( tensp, dongia, soluong, danhmuc, mausac, size, hinhanh, mota, ngaytao) values('"+ req.body.namesp +"','"+ req.body.dongia +"','"+ req.body.soluong +"','"+ req.body.tendm +"','"+ req.body.mausac +"','"+ req.body.size +"','"+ linkimg +"','"+ req.body.mota +"','"+ req.body.ngaytao +"');";
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        linkimg = null;
        res.send("ok")
      }
    });
  })






  app.post('/remove', (req, res) => {
    console.log(req.body.id)
    var sql = "DELETE FROM danhmuc WHERE iddm = "+ req.body.idxoa ;
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  app.post('/removesanpham', (req, res) => {
    console.log(req.body.id)
    var sql = "DELETE FROM sanpham WHERE masp = "+ req.body.idxoasp ;
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  // post sua san pham
app.post('/suaDanhMuc', (req, res) => {
  
  // //update sql
  console.log(req.body.idsua)
  console.log(req.body.namcatesua)


  var sql = "UPDATE danhmuc SET tendm= '" + req.body.tendmsua + "', idcha= '" + req.body.idchasua + "' WHERE iddm= '" + req.body.idsua + "'";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok")
    }
  });
})

app.post('/suaSanPham', (req, res) => {
  
  // //update sql
  // console.log(req.body.idsua)
  // console.log(req.body.namcatesua)

  if (linkimg == null) {
    linkimg = req.body.linkhinhanhsua;
} 
var sql =
"SELECT * FROM sanpham WHERE hinhanh = '" +
linkimg +
"'";

con.query(sql, function (err, result, fields) {
if (err) {
  console.log(err);
  res.send({ success: false, message: "Database không có kết nối!" });
}

if (result.length > 0) {
  var sql = "UPDATE sanpham SET tensp= '" + req.body.namespsua + "', dongia= '" + req.body.dongiasua + "', soluong= '" + req.body.soluongsua + "', danhmuc= '" + req.body.tendmsua + "', mausac= '" + req.body.mausacsua + "', size= '" + req.body.sizesua + "', mota= '" + req.body.motasua + "', ngaytao= '" + req.body.ngaytaosua + "' WHERE masp= '" + req.body.idsuasp + "'";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      linkimg = null;
      res.send("ok")
    }
  });

} else {
  var sql = "UPDATE sanpham SET tensp= '" + req.body.namespsua + "', dongia= '" + req.body.dongiasua + "', soluong= '" + req.body.soluongsua + "', danhmuc= '" + req.body.tendmsua + "', mausac= '" + req.body.mausacsua + "', size= '" + req.body.sizesua + "', mota= '" + req.body.motasua + "', hinhanh= '" + linkimg + "', ngaytao= '" + req.body.ngaytaosua + "' WHERE masp= '" + req.body.idsuasp + "'";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      linkimg = null;
      res.send("ok")
    }
  });
}


});



  
})

  // singup
  app.post("/singup", (req, res) => {
    var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.tentaikhoans +"' AND matkhau= '"+ md5(req.body.matkhaus) + "'";
 
   
    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({'success': false ,'message': "Database không có kết nối!"});
      }

      if (result.length > 0) {
        res.send({'success': false});
      } else {
        res.send({'success': true});
        var sql = "INSERT INTO taikhoan ( tentaikhoan, matkhau) values('"+ req.body.tentaikhoans +"','"+ md5(req.body.matkhaus) +"');";
        con.query(sql, function (err, result, fields) {
          if (err) throw err; 
        });
      }
    });
  });


// check user
app.post("/login", (req, res) => {
  console.log("dawng nhap")


  var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.username +"' AND matkhau= '"+ md5(req.body.password) + "'";

 
  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({'success': false ,'message': "Database không có kết nối!"});
    }


    console.log("Số lượng tài khoản:  " +result.length);
    
    if (result.length > 0) {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      console.log("Tai khoan " + json[0].idtk);
      res.send({'success': true, 'dataid': json[0].idtk});
      console.log(res);
    } else {
      res.send({'success': false ,'message': "Sai tài khoản hoặc mật khẩu"});
      console.log(res);
    }
  });
});




app.use(function (req, res, next) {
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



//get data room yeu thich
app.get("/getdatayeuthich/:idtk", (req, res) => {
  var sql = "SELECT * FROM yeuthich WHERE idtk=" + req.params.idtk;
  console.log(sql);
  var count = 0;
  var list = [];
  con.query(sql, function (err, result, fields) {
    result.map((item, index) => {
      const idPhong = item.masp;
      console.log(idPhong);
      var sql = "SELECT * FROM sanpham WHERE masp = " + idPhong;
      console.log(sql);
      // con.query(sql, function (err, data, fields) {
      //   data.map((item, index) => { 
      //     console.log(item.tenPhong);
      //     var itemnew = {
      //       id: item.masp,
      //       ten: item.tensp,
      //       tuoi: item.dongia,
      //       diachi: item.mota,
      //       hinhanh: item.hinhanh,
      //     };
      //     list.push(itemnew);
      //     count = count + 1;
      //     if (result.length == count) {
      //       res.send(list);
      //     }
      //   });

      // });
    });
  });
});