import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/services.dart';

void main() {
  SystemChrome.setEnabledSystemUIOverlays(SystemUiOverlay.values);
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: "image", // app title
        home: new MyHomePage(title: "image"));
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(

        // padding: EdgeInsets.only(top: 30),
        // Padding on container

        decoration: BoxDecoration(color: Colors.orange),
        child: Column(children: <Widget>[
          Container(
              transform: Matrix4.translationValues(0.0, -80.0, 0.0),
              decoration: new BoxDecoration(
                  shape: BoxShape.circle, color: Colors.green),
              padding: EdgeInsets.all(90.0),
              child: SvgPicture.asset("images/logo_tali_cadastro.svg",
                  height: 100, width: 100)),
          Container(
              transform: Matrix4.translationValues(0.0, -180.0, 0.0),
              width: 1200.0,
              decoration: new BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.green,
              ),
              padding: EdgeInsets.all(90.0),
              child: SvgPicture.asset("images/Img_learn_pg_1.svg")),
          Container(
              transform: Matrix4.translationValues(0.0, -180.0, 0.0),
              child: Text("Cadastre o seu comércio",
                  style: TextStyle(color: Colors.white, fontSize: 26.0))),
        ]));
  }
}
