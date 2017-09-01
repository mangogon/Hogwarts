$(function(){
    var congratulation_source=$("#congratulation-template").html()
    var congratulation_template= Handlebars.compile(congratulation_source);

    var invitation_source=$("#invitation-template").html()
    var invitation_template=Handlebars.compile(invitation_source);

    Parse.initialize('vasylynka');
    Parse.serverURL="http://localhost:1337/parse";

    var Name=Parse.Object.extend("Name");

    $("#name").hide();
    $("#ok-button").hide();
    $("#nname").hide();
    $("#ook-button").hide();
    $("#choose").hide();

    $(".family_1").click(function(){
        $("#name").show();
        $("#ok-button").show();
    });
    $(".family_2").click(function(){
        $("#nname").show();
        $("#ook-button").show();
        $("#choose").show();
        $("#choose").val('');
    });

    //Беремо імя давнього користувача, що ввели
    $("#ok-button").click(function(){
        var name = $("#name").val();//Якщо новий користувач -зберігаємо
        // Let's see if that name is in the database
        var query= new Parse.Query(Name);
        query.equalTo('nname', name);
        query.find({
            success: function(results){
                if (results.length >=1) {
                    console.log("not a new member");
                    var student = results[0];
                    var context= {name: student.get('nname'),
                                  choose: student.get('choose')
                                 };
                    var rendered_template=congratulation_template(context);
                    $("#congratulation").html(rendered_template);

                    $(".hhome").click(function(){
                        $(".container").hide();
                    });
                } 
                else {
                    console.log("a new member");                    
                };
            },
            error:function(results, error){
                console.log("can't talk to the database");
            }
        });
    })
    //Беремо ім'я нового користувача, що ввели
    $("#ook-button").click(function(){
        var nname = $("#nname").val();
        var choose = choosingHat();

        var order = new Name();
        order.save({
            nname:nname,
            choose:choose,
        },{
            success: function (order){
                $("#mmessage").addClass("alert alert-success").html("Congratulation! You are our new student!")
            },
            errors:function(order,error){
                $("#mmessage").addClass("alert alert-error").html("Error!")
            }
        })
        //Взяти збережене імя і висвітлити на головну сторінку
        /*var invitation=[];//створюємо пусту шафу
        for (var i in facultets) //створюємо комірки в датабейз
            var facultet=facultets[i];//створ.ємо назву, що використовується для кожної з комірок
        invitation.push(facultet);//в пусту шафу засуваємо комірку з інформацією
        */

        var context= {nname:nname, choose: choose};
        var rendered_template=invitation_template(context);

        $("#invitation").html(rendered_template);

        $(".home").click(function(){
            $(".container").hide();
        });

    });

});




















