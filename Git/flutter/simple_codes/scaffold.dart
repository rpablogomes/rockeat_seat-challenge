import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      title: "image", // app title
      home: Scaffold( // Scaffold is a structure (Top bar, Body and Bottom bar).
        appBar: AppBar( // Top bar
          title:Text("Top bar"),
            backgroundColor: Colors.orange
        ),
        body: Padding( // Body
          padding: EdgeInsets.all(16),
          child: Text("Main content"),
        ),
        bottomNavigationBar: BottomAppBar( // Bottom bar
          color: Colors.orange,
          child: Padding(
            padding: EdgeInsets.all(16),

          child: Row(
            children: <Widget>[
              Text("Text 1"),
              Text("Text 2")
            ],
          )
        ),
        )
      ),
  )
  );
}
