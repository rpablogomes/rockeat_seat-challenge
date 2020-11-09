import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "aligning", // app title
      home: Container(
          padding: EdgeInsets.only(top: 30), // Padding on container
          decoration: BoxDecoration(
              color: Colors.white, //Background color
              border: Border.all(
                  width: 4, // Border Width
                  color: Colors.orange // Border color
                  )),
          child: Column(
            children: <Widget>[
              Text("Z1"),
              Text("R2"),
              Text("R3"),
            ],
            mainAxisAlignment: MainAxisAlignment
                .start, // Main axis alignment (vertical) on Column. (horizontal) on Row.
            crossAxisAlignment: CrossAxisAlignment
                .end, //Cross axis alignment (horizontal) on Column. (vertical) on Row.
          ))));
}
