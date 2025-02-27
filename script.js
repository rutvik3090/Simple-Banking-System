var userData = [];
var numReg = /^\d+$/;
var id = 101;

var adminList = [
    { id: 1, adminName: "rk", adminPassword: 121 },
    { id: 2, adminName: "rk_1", adminPassword: 121 },
];

function checklen(inp, len) {
    //-------------------------------Check Length--------------------------------------
    do {
        var inputString = prompt(inp);
    } while (inputString.length < len);
    return inputString;
}

function checkNum(inp) {
    //-------------------------------Check Number--------------------------------------
    do {
        var num = prompt(inp);
    } while (!num.match(numReg));
    return parseInt(num);
}

function userOperation(userObject) {
    //-------------------------------User Operation--------------------------------------
    var userDoWhile = true;
    do {
        var userChoice = checkNum(
            "What's your user role ? \n1. WithDraw \n2. Deposit \n3. Show Balance \n4. Exit"
        );
        switch (userChoice) {
            case 1:
                //-------------------------WithDraw------------------------------
                var withDrawAmount = checkNum("Enter WithDraw Amount: ");
                if (userObject.accountBalance < withDrawAmount) {
                    alert("Insufficient Balance!");
                } else {
                    userObject.accountBalance -= withDrawAmount;
                    alert("WithDrawed Successfully, Amount has been debited!");
                }
                break;

            case 2:
                //-------------------------Deposit------------------------------
                var depositAmount = checkNum("Enter Deposit Amount: ");
                userObject.accountBalance += depositAmount;
                alert("Deposited Successfully, Amount has been credited!");
                break;

            case 3:
                //-------------------------Show Balance------------------------------
                alert(
                    "Account Number= " +
                    userObject.accountNumber +
                    "\nAccount Balance= " +
                    userObject.accountBalance
                );
                break;

            case 4:
                alert("Thank You!");
                userDoWhile = false;
                break;

            default:
                alert("Please select appropriate choice. Thank You!");
                break;
        }
    } while (userDoWhile);
}

function user() {
    //--------------------------------User---------------------------------------

    var flag = -1;
    var loginUsername = checklen("Enter your Username: ", 3);
    for (var l of userData) {
        if (loginUsername == l.userName) {
            var loginPassword = checklen("Enter your Password: ", 6);
            if (loginPassword == l.password) {
                if (l.status == 1) {
                    alert("Login Successful, Welcome!!");
                    flag = l;
                } else {
                    alert("The user has not been approved yet!!");
                }
                break;
            } else {
                flag = -2;
                break;
            }
        }
    }
    if (flag == -1) {
        alert("Invalid Username!");
    } else if (flag == -2) {
        alert("Wrong Password!");
    } else {
        userOperation(flag);
    }
}

function viewData() {
    //-------------------------------View--------------------------------------
    var outputString = "";
    for (var v of userData) {
        outputString +=
            "User Id: " +
            v.id +
            " - " +
            "User Name: " +
            v.userName +
            " - " +
            "Full Name: " +
            v.fullName +
            "\n.Account Number: " +
            v.accountNumber +
            " - " +
            "Account Balance: " +
            v.accountBalance +
            " - " +
            "Status: " +
            v.status +
            "\n";
    }
    alert(outputString);
}

function manageUser() {
    //-----------------------Manage User---------------------
    viewData();
    var flag = -1;

    var approvalId = checkNum(
        "Which user you want to approve ? \n(Please enter the User Id): "
    );

    for (var i of userData) {
        if (approvalId == i.id && i.status == 0) {
            flag = 0;
            i.status = 1;
            var result = "";
            for (var j = 0; j < 16; j++) {
                result += Math.floor(Math.random() * 10);
            }
            i.accountNumber = result;
            alert("User Approved. Thank You!");
            break;
        } else if (approvalId == i.id && i.status == 1) {
            flag = 1;
            alert("User has been already Approved. Thank You!");
        }
    }
    if (flag == -1) {
        alert("Invalid User Id, Please enter a valid User Id!!");
    }
}

function admin() {
    //---------------------------Admin---------------------------------------

    var adminFlag = 0;
    var adminUserName = checklen("Enter your Admin Username: ", 3);
    for (var a of adminList) {
        if (adminUserName == a.adminName) {
            adminFlag = 1;
            var adminUserPassword = checklen("Enter your Admin Password: ", 3);
            if (adminUserPassword == a.adminPassword) {
                adminFlag = 2;
                alert("Login Successfull, Welcome to Admin Side");
            }
        }
    }
    if (adminFlag == 0) {
        alert("Invalid Admin UserName !!!");
    } else if (adminFlag == 1) {
        alert("Invalid Admin Password !!!");
    } else {
        var adminDoWhile = true;
        do {
            var adminChoice = checkNum(
                "What's your user role ? \n1. Manage User \n2. Exit"
            );

            switch (adminChoice) {
                case 1:
                    manageUser();
                    break;

                case 2:
                    adminDoWhile = false;
                    alert("Thank you!");
                    break;

                default:
                    alert("Please select appropriate choice. Thank You!");
                    break;
            }
        } while (adminDoWhile);
    }
}

function visitor() {
    //------------------------------Visitor--------------------------------------

    var userName = checklen("Enter the username: \nEnter atleast 3 chars", 3);
    var password = checklen("Enter the password: \nEnter atleast 6 chars", 6);
    var fullName = checklen("Enter the full name: \nEnter atleast 5 chars", 5);
    var status = 0;
    var accountNumber = "0";
    var accountBalance = 0;
    var dummy = {
        id: id++,
        userName,
        password,
        fullName,
        accountNumber,
        accountBalance,
        status,
    };
    userData.push(dummy);
    alert("User data added successfully !!!");
}

var doWhile = true;
do {
    var choice = checkNum(
        "What's your user role ? \n1. Visitor \n2. Admin \n3. User \n4. Exit"
    );

    switch (choice) {
        case 1:
            visitor();
            break;

        case 2:
            admin();
            break;

        case 3:
            user();
            break;

        case 4:
            doWhile = false;
            alert("Thank you! for visiting our system...");
            break;

        default:
            alert("Please select appropriate choice. Thank You!");
            break;
    }
} while (doWhile);