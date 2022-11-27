package com.montesown.BeeTracker;

import com.montesown.BeeTracker.model.Forcast;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.Charset;

public class WeatherService {
    public Forcast getCurrentWeather() throws Exception {
        String apiEndPoint="http://dataservice.accuweather.com/currentconditions/v1/18832_PC?apikey=3sDbKXrGsKkJHXGGP6FWpoCWiCHJIYZd";
        StringBuilder requestBuilder=new StringBuilder(apiEndPoint);
        URIBuilder builder = new URIBuilder(requestBuilder.toString());
        HttpGet get = new HttpGet(builder.build());

        CloseableHttpClient httpclient = HttpClients.createDefault();

        CloseableHttpResponse response = httpclient.execute(get);

        String rawResult=null;

        try {
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
                System.out.printf("Bad response status code: ", response.getStatusLine().getStatusCode());
            }

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                rawResult=EntityUtils.toString(entity, Charset.forName("utf-8"));
            }

        } finally {
            response.close();
        }
        JSONArray weatherArr = new JSONArray(rawResult);
        JSONObject weatherObj = weatherArr.getJSONObject(0);
        String condition = weatherObj.get("WeatherText").toString();
        int icon = weatherObj.getInt("WeatherIcon");
        Object temp = weatherObj.get("Temperature");
        JSONObject tempObj = (JSONObject) temp;
        Object imperial = tempObj.get("Imperial");
        JSONObject imperialObj = (JSONObject) imperial;
        Object valueBig = imperialObj.get("Value");
        String valueStr = valueBig.toString();
        BigDecimal value = new BigDecimal(valueStr);
        int temperature = value.intValue();

        Forcast forcast = new Forcast(temperature,condition,icon);
        return forcast;

    }
    /**private Forcast parseJson(String  rawResult) throws IOException {

        JSONArray weatherArr = new JSONArray(rawResult);
        JSONObject weatherObj = weatherArr.getJSONObject(0);
        String condition = weatherObj.get("WeatherText").toString();
        int icon = weatherObj.getInt("WeatherIcon");
        Object temp = weatherObj.get("Temperature");
        JSONObject tempObj = (JSONObject) temp;
        Object imperial = tempObj.get("Imperial");
        JSONObject imperialObj = (JSONObject) imperial;
        Object valueBig = imperialObj.get("Value");
        String valueStr = valueBig.toString();
        BigDecimal value = new BigDecimal(valueStr);
        int temperature = value.intValue();

        Forcast forcast = new Forcast(temperature,condition,icon);
        return forcast;
    }**/
}
