import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "image", // app title
      home: Container(
        padding: EdgeInsets.only(top: 30), // Padding on container
          decoration: BoxDecoration(
            color: Colors.white,        //Background color
              border: Border.all(
                width: 4, // Border Width
                color: Colors.orange // Border color
              )
          ),
        child: Image.asset(
          "images/universe.jpg",
          fit: BoxFit.contains

          // BoxFit.contains shows the image maintaining proprieties
          // BoxFit.none cover the screen with the image
          // BoxFit.cover will cover the screen zooming the image
          // BoxFit.fill cover the screen stretches the image
          // BoxFit.fitHeight ensures covering height not mattering width
          // BoxFit.fitWidth ensures covering width not mattering height
          // BoxFit.scaleDown reduces the image to fit on the container

        ),
        )
  ));
}
