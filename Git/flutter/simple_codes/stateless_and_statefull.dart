import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget { //stateless doesn't change
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Frases do Dia',
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Frases do Dia'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
        padding: EdgeInsets.all(30),
              child: Image.asset(
                'images/logo.png'
            )
            ),
            Padding(
                padding: EdgeInsets.all(30),
            child: Text(
              'Gratidão não é pagamento, mas um reconhecimento que se demonstra no dia a dia.',
                style: TextStyle(
                  fontSize: 28
                ))
            ),
          ],
        ),
      ),
    );
  }
}
