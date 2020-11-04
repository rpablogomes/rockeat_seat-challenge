import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "Lorem ipsum", // app title
      home: Container(
          color: Colors.white,
          child: Column(
            children: <Widget>[
              Text(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", //Text on screen
                  style: TextStyle(
                    // Style
                    fontSize: 50, //Style properties
                    fontStyle: FontStyle.normal,
                  ))
            ],
          ))));
}
