import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "Lorem ipsum", // app title
      home: Container(
          color: Colors.white, //background color
          child: Column(
            children: <Widget>[
              FlatButton(
                  onPressed: () {
                    print("Pressed Button");
                  },
                  child: Text("Press here", style: TextStyle(fontSize: 50)))
            ],
          ))));
}
