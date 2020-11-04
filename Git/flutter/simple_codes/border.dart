import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "Border", // app title
      home: Container(
        decoration: BoxDecoration(
            //Decoration class
            color: Colors.black, //Background color
            border: Border.all(
                //Border class
                width: 4,
                color: Colors.orange)), //Width and color
      )));
}
