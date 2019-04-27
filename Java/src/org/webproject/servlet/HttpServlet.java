package org.webproject.servlet;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.webproject.servlet.DBUtility;

/**
 * Servlet implementation class HttpServlet
 */
@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see javax.servlet.http.HttpServlet#javax.servlet.http.HttpServlet()
     */
    public HttpServlet() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }


    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse
            response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String tab_id = request.getParameter("tab_id");

        // create a report
        if (tab_id.equals("0")) {
            System.out.println("A report is submitted!");
            try {
                createReport(request, response);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // query reports
    }

    private void createReport(HttpServletRequest request, HttpServletResponse
            response) throws SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        String sql;

        // 1. create emergency contact
        int contact_id = 0;
        String report_type = request.getParameter("report_type");
        String report_name = request.getParameter("report_name");
        String report_notes = request.getParameter("report_notes");
        String report_object = request.getParameter("report_object");
        float report_lat = Float.parseFloat(request.getParameter("report_lat"));
        float report_lon = Float.parseFloat(request.getParameter("report_lon"));
        if (report_type != null) {report_type = "'" + report_type + "'";}
        if (report_name != null) {report_name = "'" + report_name + "'";}
        if (report_notes != null) {report_notes = "'" + report_notes + "'";}
        if (report_object != null) {report_object = "'" + report_object + "'";}
        if (report_type != null && report_name != null) {
            // create the contact
            sql = "insert into placepoint (type, name, notes, object, geom) " +
                    "values (" + report_type + "," + report_name + "," + report_notes + ","
                    + report_object + "," + "ST_GeomFromText('POINT(" + report_lat + "" + report_lon +")', 4326)" + ")"; //need to add geometry
            dbutil.modifyDB(sql);

            // record the contact id
            ResultSet res_1 = dbutil.queryDB("select last_value from placepoint_id_seq");
            res_1.next();
            contact_id = res_1.getInt(1);

            System.out.println("Success! Contact created.");
        }


        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());

    }

    //should be able to repeat create report for each type
    public void main() throws JSONException {
    }
}