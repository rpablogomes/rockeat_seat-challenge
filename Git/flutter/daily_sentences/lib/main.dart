import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: "Lorem ipsum", // app title
    home: Container(color: Colors.white,
    child:Column(
      children: <Widget> [
        Text(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          style: TextStyle(
            fontSize: 50,
            fontStyle: FontStyle.normal,
          )
        )
      ],
    )
    )
  ));
}