<%@ page import="java.io.*"%>
<%@ page import="org.json.*"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="org.webproject.servlet.DBUtility" %>
<%@ page import="java.util.HashMap" %>

<html>
<body>

<%
    PrintWriter output = response.getWriter();
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    //String tab_id = request.getParameter("tab_id");
    String tab_id = "0";


// create a report
    if (tab_id.equals("0")) {
        System.out.println(request.getParameter("report_type"));

        try {
            DBUtility dbutil = new DBUtility();
            String sql;

            // 1. create emergency contact
            int contact_id = 0;
            String report_type = request.getParameter("report_type");
            String report_name = request.getParameter("report_name");
            String report_notes = request.getParameter("report_notes");
            String report_object = request.getParameter("report_object");
            System.out.println("A report is submitted!");
            if (report_type != null) {report_type = "'" + report_type + "'";}
            if (report_name != null) {report_name = "'" + report_name + "'";}
            if (report_notes != null) {report_notes = "'" + report_notes + "'";}
            if (report_object != null) {report_object = "'" + report_object + "'";}
            if (report_type != null && report_name != null) {
                // create the contact
                sql = "insert into placepoint (type, name, notes, object) " +
                        "values (" + report_type + "," + report_name + "," + report_notes + ","
                        + report_object + ")";
                dbutil.modifyDB(sql);

    }finally {
            System.out.println("An Error Occurred");
        }
    }
%>
</body>
</html>