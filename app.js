// offline


var connect;
if (navigator.onLine !== true) {
    console.log('offline')
    connect = 'offline'
} else {
    console.log('online')
    connect = 'online'
}


// function getLocalitem(){
    
    // }
var ad_div = document.getElementById('addDiv');
    
    
    function oflineFlag(image_url, title, desc) {
    var div1 = document.createElement('div')
        div1.setAttribute('class', ' col-md-4 col-lg-3 col-sm-4 ad-Image')
        ad_div.appendChild(div1)
        var image_div = document.createElement('img')
        image_div.setAttribute('class', 'card-img-top')
        image_div.src = image_url;
        image_div.style.width = '200px'
        image_div.style.height = '200px'
        image_div.setAttribute('alt', 'Ad Image')
        div1.appendChild(image_div)
        var div2 = document.createElement('div')
        // div2.setAttribute('id', id)
        div2.setAttribute('class', 'card-body')
        div1.appendChild(div2)
        var h5 = document.createElement('h5')
        h5.innerHTML = title
        div2.appendChild(h5)
        h5.setAttribute('class', 'card-title')
        var p = document.createElement('h7')
        p.setAttribute('class', 'card-text')
        // p.appendChild ("Price")
        // p.innerHTML = _price
        div2.appendChild(p)
        var p1 = document.createElement('h5')
        p1.setAttribute('class', 'card-text')
        p1.innerHTML = desc
        div2.appendChild(p1)
        var i = document.createElement('i')
        i.setAttribute('class', 'fas fa-flag flg')
        // i.setAttribute('id', id + '1')
        i.setAttribute('onclick', 'flagYellow(this)')
        var a = document.createElement('a')
        a.innerHTML = "More Detail!";
        a.setAttribute('class', 'btn btn-primary')
        a.setAttribute('onclick', 'details(this)')
        // a.setAttribute('href','details.html')
        div2.appendChild(a)
        div2.appendChild(i)
        
    
    }

    if (connect !== 'online' && location.href.indexOf('flag.html') !== -1) {
        var localStorageFlag = localStorage.getItem('flags')
        var offlinneFlags = JSON.parse(localStorageFlag)
        for (var i = 0; i<offlinneFlags.length; i++) {
            console.log(offlinneFlags)
            oflineFlag(offlinneFlags[i].imag, offlinneFlags[i].tittle, offlinneFlags[i].dec)
            
        }
    }
// notification

var tokenn  
const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BFlpBlH6C-5ToUv9zdeJQn0MuADEYHhR4SbAKKHMQVE7VnLfZsmTT0DAS7pFt8OjKk9sP5goqpbbpdszWGnOHgQ");
messaging.requestPermission()
.then(function() {
    console.log('Notification permission granted.');
    return messaging.getToken()
    


  })
  .then(function(token){
      tokenn = token
      console.log(tokenn)
      var fcmtoken = {
          token : tokenn
      }
      firebase.database().ref('/' + currentuserid + '/' + 'FcmToken/').set(fcmtoken)

  })

  .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
  });
 
 
 
 
  messaging.onMessage(function (payload) {
    console.log('onMessage', payload)
})

// fetch(" https://us-central1-olx-pakistan-9905f.cloudfunctions.net/helloWorld", {
//     method: 'POST',
//     body: {
//         token: "",
//         title: "my title",
//         message: "my body message"
//     },
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then((res) => res)

// var presenceRef = firebase.database().ref("disconnectmessage");
// // Write a string when this client loses connection
// presenceRef.onDisconnect().set("I disconnected!");
// Add the public key generated from the console here.


//end
var emailRef = document.getElementById('email');
var passwordRef = document.getElementById('password');
var usernameRef = document.getElementById('username');
var errorRef = document.getElementById('error');



function emailValidate() {
    var emails = document.getElementById('email')
    var emailVal = emails.value;

    if (emailVal === ' ') {
        var err = document.getElementById('errEmail');
        err.style.fontSize = '0.8em'
        err.innerHTML = '*please don`t left spaces'
        err.style.color = 'white'
    }
    // else if ( emailVal.length >= 1) {
    //     var err = document.getElementById('errEmail');
    //     err.style.fontSize = '0.8em'
    //     err.innerHTML = '*Enter email correctly'
    //     err.style.color = 'white'
    // }
    else {
        document.getElementById('errEmail').innerHTML = ''
    }
    // btnValidate()



}
function passValidate() {
    var pass = document.getElementById('password')

    var passVal = pass.value;
    if (passVal.indexOf(' ') !== -1) {
        var err = document.getElementById('errPass');
        err.style.fontSize = '0.8em'
        err.innerHTML = '*please don`t left spaces'
        err.style.color = 'white'
    }


    else {
        document.getElementById('errPass').innerHTML = ''
    }
    // btnValidate()

}
function nameValidate() {
    var name = document.getElementById('username');
    var nameVal = name.value;

    if (nameVal.indexOf('  ') !== -1) {
        var err = document.getElementById('errName');
        err.style.fontSize = '0.8em'
        err.innerHTML = '*please don`t left spaces'
        err.style.color = 'white'
    }
    else if (nameVal.length <= 4 && nameVal.length >= 1) {
        var err = document.getElementById('errName');
        err.style.fontSize = '0.8em'
        err.innerHTML = '*Name should be greater than 4 characters'
        err.style.color = 'white'
    }

    else {
        document.getElementById('errName').innerHTML = ''
    }


}




// singup function



function signup() {
    var nameuser = document.getElementById('username')
    // console.log('signup invoke', emailRef.value, passwordRef.value, usernameRef.value, phoneRef.value);
    firebase.auth().createUserWithEmailAndPassword(emailRef.value, passwordRef.value)
    
    .then((success) => {
        var objje = {
            name: nameuser.value,
            
        }
        swal("Good job!", "You clicked the button!", "success");
        firebase.database().ref('/' + success.user.uid + '/' + 'user').push(objje).then(()=>{
            location = './login.html';
            console.log('signup successfully', success);
            
        })

        })
        .catch((error) => {
            // swal("Something went wrong", " ", "error");
            console.error('something went wrong', error);
            errorRef.innerHTML = error.message;

        })
}


// login function 

function login() {
    console.log('login invoke', emailRef.value, passwordRef.value);
    firebase.auth().signInWithEmailAndPassword(emailRef.value, passwordRef.value)
        .then((success) => {
            // swal("Successfull", "", "success");
            console.log('signin successfully', success.user);
            localStorage.setItem('UserUid', success.user.uid)
            location = './home.html';
        })
        .catch((error) => {
            // swal("Something went wrong", "", "error");
            console.log('something went wrong', error)
        })
}

//funtion of logout  

function logOut() {
    console.log('log-out');
    firebase.auth().signOut()
        .then(function () {
            localStorage.clear()
            location = './index.html'
        })
        

}

var userId = localStorage.getItem('UserUid')


//submit add functions


var imageUrl;

function imageFile() {
    var imageFile = document.querySelector('input[type=file]').files[0];
    console.log(imageFile)
    var fileReader = new FileReader();
    // console.log(fileReader)

    fileReader.addEventListener("load", function () {
        imageUrl = fileReader.result;
        console.log(imageUrl, "imageUrl")
    }, false);

    if (fileReader) {
        var fileReaderUrl = fileReader.readAsDataURL(imageFile);
    }


}

function submitAdd() {
    var nameref = document.getElementById('nameval');
    var model = document.getElementById('modelval');
    var price = document.getElementById('yearval')
    var Description = document.getElementById('decval');
    var category = document.getElementById('catval');
    // var image = document.getElementById('imgval');
    //     console.log(nameref)
    // console.log(nameval.value)
    // console.log(imgval.value)
    // console.log(nameval.value)
    // console.log(nameval.value)
    // console.log(nameval.value)

    // console.log(firebase.auth().currentUser.uid)
    var userUid = firebase.auth().currentUser.uid;
    var obj = {
        itemName: nameref.value,
        modell: model.value,
        price: price.value,
        Descriptions: Description.value,
        category: category.value,
        image: imageUrl,
    }


    if (obj.itemName !== '' & obj.modell !== '' & obj.price !== '' & obj.Descriptions !== '') {


        // console.log("hello")
        firebase.database().ref('/' + userUid + '/' + obj.category + '/').push(obj)
            .then(() => {
                console.log('successfuly added')
                location = './home.html'
            })

    } else {

    }



}



// home data base render 

var ad_div = document.getElementById('addDiv');

function createDiv(image_url, title, _price, desc, id) {
    var div1 = document.createElement('div')
    div1.setAttribute('class', ' col-md-4 col-lg-3 col-sm-4 ad-Image')
    ad_div.appendChild(div1)
    var image_div = document.createElement('img')
    image_div.setAttribute('class', 'card-img-top')
    image_div.src = image_url;
    image_div.style.width = '200px'
    image_div.style.height = '200px'
    image_div.setAttribute('alt', 'Ad Image')
    div1.appendChild(image_div)
    var div2 = document.createElement('div')
    div2.setAttribute('id', id)
    div2.setAttribute('class', 'card-body')
    div1.appendChild(div2)
    var h5 = document.createElement('h5')
    h5.innerHTML = title
    div2.appendChild(h5)
    h5.setAttribute('class', 'card-title')
    var p = document.createElement('h7')
    p.setAttribute('class', 'card-text')
    // p.appendChild ("Price")
    p.innerHTML = _price
    div2.appendChild(p)
    var p1 = document.createElement('h5')
    p1.setAttribute('class', 'card-text')
    p1.innerHTML = desc
    div2.appendChild(p1)
    var i = document.createElement('i')
    i.setAttribute('class', 'fas fa-flag flg')
    i.setAttribute('id', id + '1')
    i.setAttribute('onclick', 'flagYellow(this)')
    var a = document.createElement('a')
    a.innerHTML = "More Detail!";
    a.setAttribute('class', 'btn btn-primary')
    a.setAttribute('onclick', 'details(this)')
    // a.setAttribute('href','details.html')
    div2.appendChild(a)
    div2.appendChild(i)


}


function dataincome() {

    firebase.database().ref('/').on('child_added', (snapShot) => {
        // console.log(snapShot.val())
        for (var key in snapShot.val()) {
            var value = snapShot.val()[key];
            // console.log(key)
            for (var key2 in value) {
                // var value1 = value[key2];
                // console.log(key2)
                if (value[key2].itemName !== undefined) {
                    createDiv(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                }

            }


        }
    })
    flagRed()
}
// search bar codding
function searchInitial() {
    var cat = document.getElementById('search').value
    ad_div.innerHTML = "";
    // location = './search.html'


    firebase.database().ref('/').on('child_added', (snapShot) => {
        // console.log(snapShot.val())
        for (var key in snapShot.val()) {
            var value = snapShot.val()[key];
            // console.log(value)
            for (var key2 in value) {
                var value1 = value[key2];
                // console.log(value1)
                if (value[key2].category === cat) {

                    console.log('hello')
                    createDiv(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                }
            }
        }
        flagRed()
    })
    
}

// search by input field


var searchInput = document.getElementById("searach");
function search() {
    ad_div.innerHTML = "";
    var abc = searchInput.value
    console.log(abc)

    firebase.database().ref('/').on('child_added', (snapShot) => {
        // console.log(snapShot.val())
        for (var key in snapShot.val()) {
            var value = snapShot.val()[key];
            // console.log(value)
            for (var key2 in value) {
                var value1 = value[key2];
                console.log(value1)
                if (value[key2].itemName === abc) {

                    console.log('hello')
                    createDiv(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                    abc.innerText = "";
                }
                else if (value[key2].category === abc) {
                    createDiv(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                    abc.innerText = "";
                }

            }
        }
        flagRed()
    })
}
// favourit ka code hy :) **********

var currentuserid = localStorage.getItem('UserUid')

function flagYellow(flag) {
    // console.log(flag.parentNode.id)
    if (flag.style.color !== 'red') {
        flag.style.color = 'red'
        // yahan pa firebase ma add hoga
        if (currentuserid !== null) {
            firebase.database().ref('/' + currentuserid + '/favourite/' + flag.parentNode.id).push("true")
            console.log('favourite added')
        }
    }
    else if (flag.style.color === 'red') {
        flag.style.color = 'black'
        // yahan pa firebase se remove hoga
        firebase.database().ref('/' + currentuserid + '/favourite/' + flag.parentNode.id).remove()

        
        console.log('delet hoga ya ')
    }
}

//  flag off lline 


var localData = []
var are = []
function offlineFlag() {
    // console.log('hello')
    

    
    
    
    if (currentuserid !== null) {
        firebase.database().ref('/' + currentuserid + '/').on('value', (snapshot) => {
            // console.log(snapshot.val().favourite)
            for (var key in snapshot.val().favourite) {
                var key12 = key;
                // console.log(key12)
                are.push(key12)
            }
        })
            // console.log(are)
            firebase.database().ref('/').on('child_added', (snapShot) => {
                // console.log(snapShot.val())
                for (var key in snapShot.val()) {
                    var value = snapShot.val()[key];
                    // console.log(value)
                    for (var key2 in value) {
                        var value1 = value[key2];
                        // console.log(key2)
                        for (var i = 0; i < are.length; i++) {
                            if (key2 === are[i]) {
                                
                                // console.log(key2)
                                if (value[key2].itemName !== undefined) {
                                    console.log('hello2')
                                    // aarri = value[key2]
                                    var flagdata = {
                                        imag: value[key2].image,
                                        tittle: value[key2].itemName,
                                        dec: value[key2].Descriptions
                                    }
                                    localData.push(flagdata)

                                   localStorage.setItem('flags', JSON.stringify(localData))
                                    
                                }
                            }
                            
                        }
                    }
                }
                // console.log( aarri)
                // localStorage.setItem['flags',aarri]
            })
        
    }
}







// adding flags list





function flagListDiv(image_url, title, _price, desc, id) {
    var div1 = document.createElement('div')
    div1.setAttribute('class', ' col-md-4 col-lg-3 col-sm-4 ad-Image')
    ad_div.appendChild(div1)
    var image_div = document.createElement('img')
    image_div.setAttribute('class', 'card-img-top')
    image_div.src = image_url;
    image_div.style.width = '200px'
    image_div.style.height = '200px'
    image_div.setAttribute('alt', 'Ad Image')
    div1.appendChild(image_div)
    var div2 = document.createElement('div')
    div2.setAttribute('id', id)
    div2.setAttribute('class', 'card-body')
    div1.appendChild(div2)
    var h5 = document.createElement('h5')
    h5.innerHTML = title
    div2.appendChild(h5)
    h5.setAttribute('class', 'card-title')
    var p = document.createElement('h7')
    p.setAttribute('class', 'card-text')
    // p.appendChild ("Price")
    p.innerHTML = _price
    div2.appendChild(p)
    var p1 = document.createElement('h5')
    p1.setAttribute('class', 'card-text')
    p1.innerHTML = desc
    div2.appendChild(p1)
    var i = document.createElement('i')
    i.setAttribute('class', 'fas fa-flag flg')
    i.setAttribute('id', id + '1')
    i.setAttribute('onclick', 'flagYellow(this)')
    var a = document.createElement('a')
    a.innerHTML = "More Detail!";
    a.setAttribute('class', 'btn btn-primary')
    a.setAttribute('onclick', 'details(this)')
    // a.setAttribute('href','details.html')
    div2.appendChild(a)
    div2.appendChild(i)
    

}
var arri = []
var arrayy = []
function flagList() {
    console.log('hello')
    
//     var localStorageFlag = localStorage.getItem('flags')
//     var offlinneFlags = JSON.parse(localStorageFlag)
//     for (var i = 0; offlinneFlags.length; i++) {
//       console.log(offlinneFlags[i].dec)
        
//     
// 
    
    // ad_div.innerHTML = "";
    
    if (currentuserid !== null) {
        firebase.database().ref('/' + currentuserid + '/').on('value', (snapshot) => {
            // console.log(snapshot.val().favourite)
            for (var key in snapshot.val().favourite) {
                var key12 = key;
                // console.log(key12)
                arrayy.push(key12)
            }
        })
            // console.log(arrayy)
            firebase.database().ref('/').on('child_added', (snapShot) => {
                // console.log(snapShot.val())
                for (var key in snapShot.val()) {
                    var value = snapShot.val()[key];
                    // console.log(value)
                    for (var key2 in value) {
                        var value1 = value[key2];
                        // console.log(key2)
                        for (var i = 0; i < arrayy.length; i++) {
                            if (key2 === arrayy[i]) {
                                
                                // console.log(key2)
                                if (value[key2].itemName !== undefined) {
                                    console.log('hello2')
                                    aarri = value[key2]
                                    
                                    flagListDiv(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                                    flagRed()
                                }
                            }
                            
                        }
                    }
                }
                console.log( aarri)
                // localStorage.setItem['flags',aarri]
            })
        
    }

}

// function reload(){location = './flag.html' }
//                 function deleteFlag(flags){
//                     if (currentuserid !== null) {
//                         firebase.database().ref('/' + currentuserid + '/favourite/' + flags.parentNode.id).remove()
                        
//                         reload()
                        
//                     }
                            
//                 }

// flag color red 
function flagRed() {
    if (currentuserid !== null) {
        firebase.database().ref('/').on('value', (snapShot) => {
            // console.log(snapShot.val())
            for (var key in snapShot.val()) {
                if (key === currentuserid) {
                    var value = snapShot.val()[key];
                    // console.log(value)
                    for (var key2 in value.favourite) {
                        // console.log
                        
                        if (document.getElementById(key2 + '1') !== null) {

                            document.getElementById(key2 + '1').style.color = 'red'
                        }

                    }

                }
                
            }
        })

    }

}
// details

function detailcreat(image_url, title, _price, desc, id) {
    var div1 = document.createElement('div')
    div1.setAttribute('class', ' col-md-4 col-lg-3 col-sm-4 ad-Image')
    ad_div.appendChild(div1)
    var image_div = document.createElement('img')
    image_div.setAttribute('class', 'card-img-top')
    image_div.src = image_url;
    image_div.style.width = '200px'
    image_div.style.height = '200px'
    image_div.setAttribute('alt', 'Ad Image')
    div1.appendChild(image_div)
    var div2 = document.createElement('div')
    div2.setAttribute('id', id)
    div2.setAttribute('class', 'card-body')
    div1.appendChild(div2)
    var h5 = document.createElement('h5')
    h5.innerHTML = title
    div2.appendChild(h5)
    h5.setAttribute('class', 'card-title')
    var p = document.createElement('h7')
    p.setAttribute('class', 'card-text')
    // p.appendChild ("Price")
    p.innerHTML = _price
    div2.appendChild(p)
    var p1 = document.createElement('h5')
    p1.setAttribute('class', 'card-text')
    p1.innerHTML = desc
    div2.appendChild(p1)

}



function details(more) {

    localStorage.setItem('detailKey', more.parentElement.id)
    location = './details.html'

}
var productdetail = localStorage.getItem('detailKey')


function detailincome() {
    if (currentuserid !== null) {
        firebase.database().ref('/').on('child_added', (snapShot) => {
            // console.log(snapShot.val())
            for (var key in snapShot.val()) {
                var value = snapShot.val()[key];
                // console.log(value)
                for (var key2 in value) {
                    // var value = snapShot.val()[key2];
                    // console.log(key2)
                    if (key2 === productdetail) {
                        // console.log(key2)
                        if (value[key2].itemName !== undefined) {
                            // console.log('hello2')

                            detailcreat(value[key2].image, value[key2].itemName, value[key2].price, value[key2].Descriptions, key2)
                        }



                    }
                }
            }

        })

    }

}

//  chat app 

var messageTextFiled = document.getElementById('btn-input')
function buttonHide() {
    if(messageTextFiled.value !== ""){
    document.getElementById('btn-chat').disabled = false
    document.getElementById('btn-chat').style.opacity = '2'

    }
    else{
     document.getElementById('btn-chat').disabled = true
      document.getElementById('btn-chat').style.opacity = '0.2'
    }
}


var adUserProductId;

function productId() {

    if (currentuserid !== null) {
        firebase.database().ref('/').on('child_added', (snapShot) => {
            for (var key in snapShot.val()) {
                // console.log(snapShot.val()[key])
                var value = snapShot.val()[key]
                for (var key2 in value) {
                    if (productdetail === key2) {
                        if (value[key2].itemName !== undefined) {
                            console.log(snapShot.key)
                            adUserProductId = snapShot.key
                            if (adUserProductId !== currentuserid ) {
                                senderKey()
                                
                            }
                            else{
                                userName()
                            }
                        }
                    }
                }
            }
            // console.log(adUserProductId)
        })
    }
}
function usersName(liText,id){
    var nameDiv = document.getElementById('chatId')
    var li = document.createElement('li')
    li.innerHTML = liText
    li.setAttribute('id', id)
    li.setAttribute('onclick', 'senderKey(this)')
    li.setAttribute('class', 'stylingClass')
    nameDiv.appendChild(li)

}
var messagePath = document.getElementById('btn-input')

function messageUpload(){
    if (currentuserid !== null) {
        if (adUserProductId !==currentuserid ) {
            var messg={
                message : messagePath.value,
                senderId : currentuserid ,
                reciverId : adUserProductId, 
                productId : productdetail,
                

            }
        firebase.database().ref('/' + 'messages/'  + productdetail + '/' + currentuserid ).push (messg)

            
        }
        else if (senderIdKey !== undefined){
            var messg={
                message : messagePath.value,
                senderId : currentuserid ,
                reciverId : senderIdKey, 
                productId : productdetail,
            }

            firebase.database().ref('/' + 'messages/'  + productdetail + '/' + senderIdKey ).push (messg)

            
        }
        else{}
    }
    messagePath.value =""
    buttonHide()
}
var senderIdKey

 function userName(){
    firebase.database().ref('/messages/'+productdetail).on('child_added', (snapShot) => {
console.log(snapShot.key)
firebase.database().ref('/'+snapShot.key + '/user').on('child_added', (snapS) => {
senderIdKey = snapShot.key
console.log(snapS.val().name)
usersName(snapS.val().name,snapShot.key)
})

})


}

var overFlowDiv = document.getElementById('cahtDiv')
 function senderKey(sender) {
    // console.log(senderKey)
    if (senderIdKey !== undefined) {
        senderIdKey= sender.id
        overFlowDiv.innerHTML = "";
        console.log(senderIdKey)
    }
    if (adUserProductId !== currentuserid) {
        firebase.database().ref('/messages/' + productdetail + '/' + currentuserid + '/').on('child_added', (snapshot) => {
            var chatData = snapshot.val()
            if (chatData.reciverId === adUserProductId && chatData.senderId === currentuserid) {
                // console.log(snapshot.val())
                createDivForSender(chatData.message)
                // updateScroll()
            } else {
                createDivForReciever(chatData.message)
                // updateScroll()
            }
        })
    } else {
        // console.log(senderKey)
        // overFlowDiv.removeChild(document.getElementById('flexDiv'))
        // document.getElementById('btn-back').style.display = 'block'
        firebase.database().ref('/messages/' + productdetail + '/' + senderIdKey + '/').on('child_added', (snapShot) => {
            
         
            var chat2Data = snapShot.val()
            if (chat2Data.reciverId === currentuserid && chat2Data.senderId === senderIdKey) {
                // console.log(snapshot.val())
                createDivForReciever(chat2Data.message)
                // updateScroll()
            } else {
                createDivForSender(chat2Data.message)
                // updateScroll()
            }
        })
    }

}
function createDivForSender(msgContent) {
    var div = document.createElement('div')
    div.setAttribute('class', 'messageDisplay hidden')
    var div2 = document.createElement('div')
    div2.setAttribute('class', 'messages')
    var div3 = document.createElement('div')
    div3.innerHTML = msgContent
    // var span = document.createElement('span')
    // span.setAttribute('class', 'time')
    // span.innerHTML = msgTime

    div2.appendChild(div3)
    // div2.appendChild(span)
    div.appendChild(div2)
    overFlowDiv.appendChild(div)

}

function createDivForReciever(msgContent) {
    var div = document.createElement('div')
    div.setAttribute('class', 'messageDisplay2 hidden')
    var div2 = document.createElement('div')
    div2.setAttribute('class', 'messages2')
    var div3 = document.createElement('div')
    div3.innerHTML = msgContent
    // var span = document.createElement('span')
    // span.setAttribute('class', 'time')
    // span.innerHTML = msgTime

    div2.appendChild(div3)
    // div2.appendChild(span)
    div.appendChild(div2)
    overFlowDiv.appendChild(div)
}
// ********************************
// *********************************
//************************************** 
// TODO add service worker code here


// TODO add service worker code here
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}



