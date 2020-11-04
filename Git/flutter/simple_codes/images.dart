import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "image", // app title
      home: Container(
        padding: EdgeInsets.only(top: 30), // Padding on container
        decoration: BoxDecoration(
            color: Colors.white, //Background color
            border: Border.all(
                width: 4, // Border Width
                color: Colors.orange // Border color
                )),
        child: Image.asset("images/sun.jpg" //relative adress of image
            ),
      )));
}
