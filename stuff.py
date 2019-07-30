import pandas as pd
import numpy as np
from datetime import datetime
from dateutil import parser

import warnings
warnings.filterwarnings("ignore") 

df = pd.read_csv("data.csv")
print(df.head(10))
print(type(df['date'][0]))
print(type(df['salescount'][0]))

df['date'] =  pd.to_datetime(df['date'], format='%m/%d/%y')
print(df.head(5))
print(type(df['date'][0]))

dates = pd.date_range(start='01/02/2016', end='01/27/2019', freq='D')

data = pd.DataFrame(index=range(len(dates)),columns=range(2))
data.columns = ['dates', 'Sales Count']

for i in range(0,len(dates)):
    data['dates'][i] = dates[i]
    for j in range(0,len(df)):
        if (dates[i]==df['date'][j]):
            data['Sales Count'][i] =  df['salescount'][j]
            break
        else:
            data['Sales Count'][i] =  0     



data.head(10)


data.shape


#%matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()


fig, ax = plt.subplots()
fig.set_size_inches(20, 10)
data['Sales Count'].plot()
start = pd.to_datetime('2016-01-02')


data['weekdays'] = data['dates'].dt.week
data['months'] = data['dates'].dt.month
data['years'] = data['dates'].dt.year
data['daysName'] = data['dates'].dt.weekday_name
data['days'] = data['dates'].dt.weekday


#It is important to note that the days name along with the index that python uses
# For eg. Monday is 0, Tuesday is 1 and so on and so forth 


#For aggregated results, we will exclude year 2019 as data is incomplete
dataAgg = data.copy()


dataAgg = dataAgg[dataAgg.years != 2019]


dataAgg.head(2)


weeklyData = np.zeros(53)
monthlyData = np.zeros(12)
dayWiseData = np.zeros(7)
for i in range(0,len(dataAgg)):
    month = dataAgg['months'][i]
    week = dataAgg['weekdays'][i]
    day = dataAgg['days'][i]
    weeklyData[week-1] = weeklyData[week-1] + dataAgg['Sales Count'][i]
    monthlyData[month-1] = monthlyData[month-1] + dataAgg['Sales Count'][i]
    dayWiseData[day] = dayWiseData[day] + dataAgg['Sales Count'][i]


objects = ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
y_pos = np.arange(len(objects))
plt.bar(y_pos, monthlyData, align='center', alpha=0.8)
plt.xticks(y_pos, objects)
plt.ylabel('Total Sales Counts')
plt.title('Month')
plt.show()




objects = ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
y_pos = np.arange(len(objects))
plt.bar(y_pos, dayWiseData, align='center', alpha=0.8)
plt.xticks(y_pos, objects)
plt.ylabel('Total Sales Counts')
plt.title('Day of the Week')
plt.show()


monthlyData2016 = np.zeros(12)
monthlyData2017 = np.zeros(12)
monthlyData2018 = np.zeros(12)
dayWiseData2016 = np.zeros(7)
dayWiseData2017 = np.zeros(7)
dayWiseData2018 = np.zeros(7)



for i in range(0,len(dataAgg)):
    month = dataAgg['months'][i]
    day = dataAgg['days'][i]
    if dataAgg['years'][i] == 2016:    
        monthlyData2016[month-1] = monthlyData2016[month-1] + dataAgg['Sales Count'][i]
        dayWiseData2016[day] = dayWiseData2016[day] + dataAgg['Sales Count'][i]
    elif dataAgg['years'][i] == 2017:    
        monthlyData2017[month-1] = monthlyData2017[month-1] + dataAgg['Sales Count'][i]
        dayWiseData2017[day] = dayWiseData2017[day] + dataAgg['Sales Count'][i]
    else:    
        monthlyData2018[month-1] = monthlyData2018[month-1] + dataAgg['Sales Count'][i]
        dayWiseData2018[day] = dayWiseData2018[day] + dataAgg['Sales Count'][i]





n_groups = 7
fig, ax = plt.subplots()
index = np.arange(n_groups)
bar_width = 0.2
opacity = 0.8

rects1 = plt.bar(index, dayWiseData2016, bar_width,
alpha=opacity,
color='b',
label='2016')
 
rects2 = plt.bar(index + bar_width, dayWiseData2017, bar_width,
alpha=opacity,
color='g',
label='2017')

rects3 = plt.bar(index + bar_width*2, dayWiseData2018, bar_width,
alpha=opacity,
color='r',
label='2018')

plt.xlabel('Years')
plt.ylabel('Sales Count')
plt.title('Daywise Sales Count by Years')
plt.xticks(index + bar_width, ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'))
plt.legend()
 
plt.tight_layout()
plt.show()






n_groups = 12
fig, ax = plt.subplots()
index = np.arange(n_groups)
bar_width = 0.2
opacity = 0.8

rects1 = plt.bar(index, monthlyData2016, bar_width,
alpha=opacity,
color='b',
label='2016')
 
rects2 = plt.bar(index + bar_width, monthlyData2017, bar_width,
alpha=opacity,
color='g',
label='2017')

rects3 = plt.bar(index + bar_width*2, monthlyData2018, bar_width,
alpha=opacity,
color='r',
label='2018')

plt.xlabel('Years')
plt.ylabel('Sales Count')
plt.title('Monthwise Sales Count by Years')
plt.xticks(index + bar_width, ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
plt.legend()
 
plt.tight_layout()
plt.show()





from statsmodels.tsa.stattools import adfuller


timeSeries = data.copy()
timeSeries.drop(['weekdays', 'months', 'years', 'days', 'daysName' ], axis=1, inplace = True)
timeSeries.head(10)



dftest = adfuller(timeSeries['Sales Count'], autolag='AIC')



print("p Value of the test is:")
print(dftest[1])
print("Since the value is less than 0.05, the time series is stationary")



from statsmodels.tsa.stattools import acf, pacf



ACF = acf(timeSeries['Sales Count'], nlags=20)
PACF = pacf(timeSeries['Sales Count'], nlags=20, method='ols')
# print(ACF)
# print(PACF)



from pandas import Series


from matplotlib import pyplot
from statsmodels.graphics.tsaplots import plot_acf
series = timeSeries['Sales Count'].astype(float)
plot_acf(series)
pyplot.show()



from matplotlib import pyplot
from statsmodels.graphics.tsaplots import plot_acf
series = timeSeries['Sales Count'].astype(float)
plot_acf(series,lags = 50)
pyplot.show()

from statsmodels.graphics.tsaplots import plot_pacf
series = timeSeries['Sales Count']
plot_pacf(series, lags = 50)
pyplot.show()




timeSeriesData = timeSeries['Sales Count']
train = timeSeriesData[:int(0.7*(len(timeSeriesData)))]
test = timeSeriesData[int(0.7*(len(timeSeriesData))):]

train_diff = train - train.shift()
train_diff = train - train.values
train_diff = train - train.astype(float)


train = train.values
test = test.values

train = train.astype(float)
test = test.astype(float)





fig, ax = plt.subplots()
fig.set_size_inches(20, 10)
plt.plot(train)



fig, ax = plt.subplots()
fig.set_size_inches(20, 10)
plt.plot(train[1:100])

import itertools
p = d = q = range(0, 3) # Define the p, d and q parameters to take any value between 0 and 2
pdq = list(itertools.product(p, d, q)) # Generate all different combinations of p, q and q triplets
pdq_x_QDQs = [(x[0], x[1], x[2], 7) for x in list(itertools.product(p, d, q))]




from statsmodels.tsa.statespace.sarimax import SARIMAX
SarimaModel = SARIMAX(train, order=(2, 1, 2), seasonal_order=(2, 1, 2, 7), enforce_stationarity=False, 
                     enforce_invertibility=False)
SarimaFit = SarimaModel.fit()


print(SarimaFit.summary())


fig, ax = plt.subplots()
fig.set_size_inches(20, 10)
plt.plot(train)
plt.plot(SarimaFit.fittedvalues, color='red')




forecast = SarimaFit.predict(start=1, end=int(0.7*(len(timeSeriesData))))
# forecast



#plot the predictions for validation set
plt.plot(train[1:100], label='Train')
plt.plot(forecast[1:100], label='Prediction')
plt.show()



pred = SarimaFit.get_prediction(start = 1, end = int(0.7*(len(timeSeriesData))), dynamic=False)


#plot the predictions for validation set
plt.plot(train[1:100], label='Train')
plt.plot(pred.predicted_mean[1:100], label='Prediction')
plt.show()



mse = ((forecast - train) ** 2).mean()
print(mse)


import math
math.sqrt(mse)


adfuller(timeSeriesData, autolag = 'AIC')


