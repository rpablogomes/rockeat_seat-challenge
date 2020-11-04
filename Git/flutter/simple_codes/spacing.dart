import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "Border", // app title
      home: Container(
          padding: EdgeInsets.all(30), // Padding on container
          decoration: BoxDecoration(
              color: Colors.white, //Background color
              border: Border.all(
                  width: 4, // Border Width
                  color: Colors.orange // Border color
                  )),
          child: Column(children: <Widget>[
            Text(
              "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              textAlign: TextAlign.justify, //Justify text on screen
            )
          ]))));
}
