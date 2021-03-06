// https://github.com/AlexFast9900/Weather-station-with-the-function-of-sending-readings-to-Google-Sheets
// Функция приёма данных с микроконтроллера
function doGet(e){
  Logger.log("--- doGet ---"); // Отправить в логи информацию о начале приёма данных

 var humi = "",
     temp = "";
 
  try {
 
    // Дебаггинг
    if (e == null){e={}; e.parameters = {humi:"-1",temp:"-1"};}
 
    humi = e.parameters.humi;
    temp = e.parameters.temp;
 
    // Сохраняем данные в таблицу
    save_data(humi, temp);
 
    return ContentService.createTextOutput("Записано: Влажность: " + humi + "; Температура: " + temp); // Сообщение об успехе отправки
 
  } catch(error) { 
    Logger.log(error);    
    return ContentService.createTextOutput("Упс...." + error.message // Сообщение об ошибке
                                            + "n" + new Date() 
                                            + "nhum: " + humi +
                                            + "ntemp: " + temp);
  }  
}
 
// Функция для сохранения данных в таблицу
function save_data(hum, tem){
  Logger.log("--- save_data ---"); // Отправить в логи информацию о начале сохранения данных
 
  try {
    var dateTime = new Date(); // Записываем дату
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1_CCku2lYTrfxKpQ-5Ogjy4x4Jrg9703vpECnjp76c1w/edit"); // Ссылка на документ
    var TempSheet = ss.getSheetByName("Температура"); // Название листов для записи
    var HumSheet = ss.getSheetByName("Влажность");
 
    // Получаем информацию о последней отредактированной строке в таблице
    var row = TempSheet.getLastRow() + 1;
    var row = HumSheet.getLastRow() + 1;
 
    // Заполняем данными
    // Лист температуры
    TempSheet.getRange("A" + row).setValue(dateTime); // Дата
    TempSheet.getRange("B" + row).setValue(dateTime); // Время
    TempSheet.getRange("C" + row).setValue(tem); // Цельсия
    TempSheet.getRange("D" + row).setValue((9/5)*(Number(tem))+32); // Фаренгейты
    TempSheet.getRange("E" + row).setValue((Number(tem))+273.15); // Кельвины
    // Лист влажности
    HumSheet.getRange("A" + row).setValue(dateTime); // Дата
    HumSheet.getRange("B" + row).setValue(dateTime); // Время
    HumSheet.getRange("C" + row).setValue(hum); // Влажность
  }
 
  catch(error) {
    Logger.log(JSON.stringify(error)); // Отправить в логи информацию об ошибке
  }
 
  Logger.log("--- save_data end---"); // Отправить в логи информацию об окончании сохранения данных
}
