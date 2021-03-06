function printDouble(number){
    return new Promise((resolve) => {
      setTimeout(
        () => {
            console.log(number * 2)
         resolve()
        }, 
       Math.floor(Math.random() * 100) + 10
      )
    })
  }

 async function printAll(){
      await printDouble(1)
      await printDouble(5)
      await printDouble(10)
      await printDouble(22)
      await printDouble(89)
  }
  
  printAll()