function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
function getCourses() {
   var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.onload = function ()
   {
      var resp = JSON.parse(xhr.responseText);
      showCourses(resp.courses.coursePaperSection);
   }
   xhr.send(null);
}
function showHome() {
    document.getElementById("showHome").style.display = "inline";
}
function showCourses(course) {
    var content = "";
    for (var i = 0; i < course.length; ++i) {
      var record = course[i];
    	var addrs = record.subject.points;
      var addrs1 = record.title;
      var addrs2 = ""
      var addrs3 = ""
      if (record.description == null) {
        addrs2 = "";
      }
      else {
        addrs2 = record.description;
      }
      if (record.prerequisite == null) {
        addrs3 = "";
      }
      else {
        addrs3 = record.prerequisite;
      }
      content += "<div class = tablecontent><h3>" + record.subject.courseA + "</h3><h4>" + addrs1 + "<div>"+addrs+ " </div></h4><p>" +addrs2  + "</p><h5>"+ addrs3+"</h5></div>\n";
    }
    document.getElementById("Courses").innerHTML = content;
  }
function getPeople() {
   var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.onload = function ()
   {
      var resp = JSON.parse(xhr.responseText);
      showPeople(resp.list);
   }
   xhr.send(null);
}

function showPeople(people) {
   var content="";
   for (var i = 0; i < people.length; ++i) {
      var record1 = people[i];
			var address = record1.names;
      console.log(address)
      var address1 = record1.jobtitles;
      var address2 = record1.emailAddresses;
      var vcard = "https://unidirectory.auckland.ac.nz/people/vcard/" + record1.profileUrl[0];
      var address3 = "";

      // console.log(address2)
      if (record1.imageId!= null)
        {var img = "https://unidirectory.auckland.ac.nz/people/imageraw/" + record1.profileUrl[0] + "/" + record1.imageId  + "/small"}
      else {
        var img ="http://redsox.tcs.auckland.ac.nz/ups/logo.svg"
      }
      if (record1.extn == null) {
        address3 = "";
        content += "<div class = tablecontent> <img class = profile src=" + img + "><h3 class = names>" + address + "</h3><h4 class= names>" + address1 + "</h4><ul><li>"+ address3 +"</li><li> &#x2709 <a href= mailto:" + address2 +">"+ address2 + "</a></li><li> &#x270d <a href = "+ vcard +">vCard</a></ul></div>\n";

      }
      else {
        address3 = record1.extn;
        content += "<div class = tablecontent> <img class = profile src=" + img + "><h3 class = names>" + address + "</h3><h4 class= names>" + address1 + "</h4><ul><li> &#x2706 <a href= tel:" + address3 +">"+ address3 + "</a></li><li> &#x2709 <a href= mailto:" + address2 +">"+ address2 + "</a></li><li> &#x270d <a href = "+ vcard +">vCard</a></ul></div>\n";
      }
   }
   document.getElementById("People").innerHTML = content;
}






var currentTab = "";
  function showhomeTab() {
     if (currentTab != "homeTab") {
        currentTab = "homeTab";
        showNoTabs();
        document.getElementById("homeTab").style.backgroundColor = "#006bb3";
        document.getElementById("home").style.display = "inline";
     }
  }

  function showcourseTab() {
     if (currentTab != "courseTab") {
        currentTab = "courseTab";
        showNoTabs();
        document.getElementById("courseTab").style.backgroundColor = "#006bb3";
        document.getElementById("course").style.display = "inline";
        getCourses();
     }
  }

  function showpeopleTab() {
     if (currentTab != "peopleTab") {
        currentTab = "peopleTab";
        showNoTabs();
        document.getElementById("peopleTab").style.backgroundColor = "#006bb3";
        document.getElementById("people").style.display = "inline";
        getPeople();

     }
  }

  function shownewsTab() {
     if (currentTab != "newsTab") {
        currentTab = "newsTab";
        showNoTabs();
        document.getElementById("newsTab").style.backgroundColor = "#006bb3";
        document.getElementById("news").style.display = "inline";
	      getNews();
     }
  }
  function shownoticesTab() {
     if (currentTab != "noticesTab") {
        currentTab = "noticesTab";
        showNoTabs();
        document.getElementById("noticesTab").style.backgroundColor = "#006bb3";
        document.getElementById("notices").style.display = "inline";
        getNotices();
     }
  }
  function showguestbookTab() {
     if (currentTab != "guestbookTab") {
        currentTab = "guestbookTab";
        showNoTabs();
        document.getElementById("guestbookTab").style.backgroundColor = "#006bb3";
        document.getElementById("guestbook").style.display = "inline";
        showComments();
     }
  }


  function showNoTabs() {
     document.getElementById("homeTab").style.backgroundColor = "transparent";
     document.getElementById("courseTab").style.backgroundColor = "transparent";
     document.getElementById("peopleTab").style.backgroundColor = "transparent";
     document.getElementById("newsTab").style.backgroundColor = "transparent";
     document.getElementById("noticesTab").style.backgroundColor = "transparent";
     document.getElementById("guestbookTab").style.backgroundColor = "transparent";

     document.getElementById("home").style.display = "none";
     document.getElementById("course").style.display = "none";
     document.getElementById("people").style.display = "none";
     document.getElementById("news").style.display = "none";
     document.getElementById("notices").style.display = "none";
     document.getElementById("guestbook").style.display = "none";
  }
function postComment() {
	var feedback = document.getElementById("comment").value;
	var name = document.getElementById("name").value;

	if (feedback == "" || name == "") {
		alert("Please complete all fields!");

	} else {
		var xhr = new XMLHttpRequest();
		var comment = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
    // var comment = "http://localhost:8188/UniProxService.svc/comment?name=" + name;
		xhr.open("POST", comment, true);

		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(feedback));

		document.getElementById("comment").value = "";
		document.getElementById("name").value = "";

		xhr.onload = function () {
			showComments();
		}
	}
}

function showComments() {
	var xhr = new XMLHttpRequest();
	var htmlcomments = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
  // var htmlcomments = "http://localhost:8188/UniProxService.svc/htmlcomments";
	xhr.open("GET", htmlcomments, true);

	xhr.onload = function(){
		document.getElementById("peoplecomment").innerHTML = xhr.responseText;
	}
	xhr.send(null);
}

function getNews() {
   var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
   xhr.onload = function ()
   {
      var resp = JSON.parse(xhr.responseText);
      showNews(resp);
   }
   xhr.send(null);
}
function showNews(news) {
   var content="";
   for (var i = 0; i < news.length; ++i) {
      var record = news[i];
			var addrs = record.descriptionField;
      var addrs1 = record.linkField;
      var addrs2 = record.pubDateField;
      var addrs3 = record.titleField;
      content += "<div class = tablecontent> <h3>" + addrs3 + "</h3><h4>" + addrs2 + "</h4><p>" + addrs + "</p><a href='"+addrs1+"'>Click Me for more information</a></div>\n";
   }
   document.getElementById("News").innerHTML = content;
}

function getNotices() {
   var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
   xhr.onload = function ()
   {
      var resp = JSON.parse(xhr.responseText);
      showNotices(resp);
   }
   xhr.send(null);
}
function showNotices(notices) {
   var content="";
   for (var i = 0; i < notices.length; ++i) {
      var record = notices[i];
			var addrs = record.descriptionField;
      var addrs1 = record.linkField;
      var addrs2 = record.pubDateField;
      var addrs3 = record.titleField;
      content += "<div class = tablecontent> <h3>" + addrs3 + "</h3><h4>" + addrs2 + "</h4><p>" + addrs + "</p><a href='"+addrs1+"'>Click Me for more information</a></div>\n";
   }
   document.getElementById("Notices").innerHTML = content;
}
