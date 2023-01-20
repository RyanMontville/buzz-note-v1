package com.montesown.BeeTracker;

import com.montesown.BeeTracker.model.Forecast;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.nio.charset.Charset;

public class WeatherService {
    public Forecast getCurrentWeather() throws Exception {
        String apiEndPoint="https://api.open-meteo.com/v1/forecast?latitude=41.44&longitude=-81.39&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York";
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
        JSONObject obj = new JSONObject(rawResult);
        JSONObject weather = obj.getJSONObject("current_weather");
        double temperature = weather.getDouble("temperature");
        int weatherCode = weather.getInt("weathercode");
        String condition = "Error";
        switch (weatherCode){
            case 0:
            case 1:
                condition = "Clear Sky"; break;
            case 2: condition = "Partly Cloudy"; break;
            case 3: condition = "Overcast"; break;
            case 45:
            case 48:
                condition = "Fog"; break;
            case 51:
            case 53:
            case 55:
                condition = "Drizzle"; break;
            case 61:
            case 63:
            case 65:
            case 80:
            case 81:
            case 82:
                condition = "Rain"; break;
            case 66:
            case 67:
                condition = "Freezing Rain"; break;
            case 71:
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                condition = "Snow"; break;
            case 95:
            case 96:
            case 99:
                condition = "Thunderstorm"; break;
            default: condition = "Unknown"; break;
        }



        Forecast forecast = new Forecast(temperature,condition,weatherCode);
        return forecast;

    }

}
