# Monarch Butterfly Migrations

## Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Monarch Watch organization distributes more than a quarter of a million unique tags each year to volunteers in North America (East of the Rocky Mountains).  Volunteers place the tags on butterflies during the summer months in an effort to track their migration. Throughout their fall migration volunteers also submit butterfly sighting reports. <img align="right" img width="400" height="200" alt="dec_temps" src="https://user-images.githubusercontent.com/90050622/153723671-f168629a-0aeb-4a95-a125-49a4b56076de.jpg">These reports include the unique tag number associated with the butterfly, the date and location of the sightings, as well as any relevant notes the volunteer wishes to add. The sighting reports help us understand migration routes, timing and pacing, mortality, and changes in geographic distribution. At the end of the migration to Mexico, volunteers collect tags off of butterflies so we know where each one ended up, as well as to create a clean dataset for the upcoming tagging year. While the data for their migration south is considered complete, a separate sightings report is created to track their trip back north. This sightings report doesn't include any unique tag information, but does still show us how the butterfly population as a whole completes the last portion of the migration process. 

## Hypothesis
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Based on historical monarch butterfly observation data, the amount of future butterfly sightings in a given location can be predicted.

## Approach for Analysis

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Collecting and cleaning the data from CSVs, merging the datasets, then using pandas to fine tune our data. The data would then be processed with a regression model in Python to identify correlation between population counts and time of year. Then, extracting the processed data as a JSON, we can then load the data into JS Leaflet which will aid in a visual for our results. Lastly, we will use ML to project our future predictions. Our idea is to have a website to interact with our findings.

## How we got here
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our project has had a path very similar to our topic. We started at one stage, changed shape and identity, and became something a lot more wonderful than anyone of us could have expected

### The Process
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Our first step as a group was deciding what type of data we wanted to utilize. We had discussed our occupations and if there was a way to incorporate them into our project. As it turns out we are all in very different occupations at this time, so it was difficult to make a decision based on that. Christian had some experience with Monarch Butterflies and had found data from journeynorth.com to kick started our project. From this simple data set our project quickly evolved into its next stage. We had found our data and we were on a roll.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We started thinking about what each of our tasks would be throughout the project. Sue would focus on data cleanup as well as the creation of geojson files. Christian and Megan would work together on GitHub ownership and front end development, and Josh would look into machine learning models, as well as how to utilize marker clusters in leaflet. 

### Data Cleanup Process
1. Downloaded, read the sourced .CSVs into panda dataframes using Python and performed initial exploratory analysis on datasets:
    - df.info()
    - df.describe()
    - df.columns.tolist()
    - df.shape
    - for col in df: print(df[col].unique())
    - for col in watch2017_df: print(df[col].value_counts())
    - for column in watch2017_df.columns: print(f"Column {column} has {df[column].isnull().sum()} null values")
    - print(f"Duplicate entries: {df.duplicated().sum()}")
2. Cleaned, transformed, and output large Journey North .CSV file into repackaged .CSVs and geoJSON for machine learning and geoJSON conversion:
    - Loaded and split monarch observation data in the North_Project_MonarchsAndMilkweed_1996-2020.csv file out into Python panda dataframes by observation/sighting type and    using df.to_csv output each set to a .CSV file by observation/sighting type: Monarch Adult Sighted, Monarch Adult (FIRST sighted), Monarch Egg (FIRST sighted), Monarch (OTHER Observations), Monarch Larva (FIRST sighted), Monarch PEAK Migration, Milkweed (FIRST sighted), Monarch Fall Roost, Monarch Egg Sighted, Monarch Larva Sighted, Monarch, Captive-Reared' 'Milkweed Sighted
    - Dropped columns for geoJSON using df.drop
    - Summarized the counts by date, type, latitude and longitude using df.groupby and renamed the count column using df.rename
    - Added year column to the dataframes using pd.DateTimeIndex on the date
    - Split data in each observation/sighting type dataframe out by year into year dataframes using newly created year column and df filtering and then dropped the year column from the dataframe using df.drop
    - Added month column to the dataframes using pd.DateTimeIndex on the date
    - Split data in each observation/sighting type year dataframe into month dataframes using dataframe filtering and then dropped the month column from the dataframe using df.drop
    - Output each observation/sighting type year month dataframe to geoJSON with json.dump using a function df_to_geojson to 'geoJSONify" the data in the dataframe
3. Cleaned, transformed, and output large Monarch Watch Occurrences .CSV file into repackaged .CSVs and geoJSON for machine learning and geoJSON conversion:
    - Loaded monarch tagging data in the MWatch_occurrences_1996_2000.csv file out into Python panda dataframe
    - Added type column to dataframe for geoJSON consistency
    - Split data in dataframe out by year into year dataframes using existing year column and df filtering then using df.to_csv output each set to a .CSV file
    - Dropped columns for geoJSON using df.drop
    - Summarized the counts by date, type, country, stateProvince, latitude and longitude using df.groupby and renamed the count column using df.rename
    - Added month column to the dataframes using pd.DateTimeIndex on the date
    - Dropped the year column from the dataframe using df.drop
    - Split data in each year dataframe into month dataframes using dataframe filtering and then dropped the month column from the dataframe using df.drop
    - Output each year month dataframe to geoJSON with json.dump using a function df_to_geojson to 'geoJSONify" the data in the dataframe
4. Cleaned, transformed, and output Mexico Monarch Watch Recovery data for machine learning and geoJSON conversion
    - Loaded monarch tag recovery data in the Monarch Watch Tag Recoveries - Central Mexico - mexico-recoveries file into Python panda dataframe
    - Gathered latitude and longitude data for each of the 15 Central Mexico sites and in some cases converted to decimal latitudes and longitudes
    - Split data into dataframes by site and cleaned and standardized the data
    - Dropped columns for geoJSON using df.drop
    - Added type column to dataframe for geoJSON consistency
    - Summarized the counts by date, type, season, location, latitude and longitude using df.groupby and renamed the count column using df.rename
    - Split data in dataframe out by year into year dataframes using existing report season year column and df filtering
    - Output each report season year dataframe to geoJSON with json.dump using a function df_to_geojson to 'geoJSONify" the data in the dataframe
5. Cleaned, transformed, and output Domestic Monarch Watch Recovery data for machine learning and geoJSON conversion
    - Loaded monarch tag recovery data in the ft-Monarch Watch 2017 Season Domestic Recoveries - ft-Monarch Watch 2017 Season Domestic Recoveries.csv file into Python panda dataframe
    - drop null rows where needed
    - dropped columns for geoJSONs
    - output files as optimized geoJSON unsummarize and summarized
    - Mapped and designed layers for data using JavaScript, Mapbox, Leaflet, and tested the performance and usability of the geJSON files in Mapbox map/Leaflet layers
6. Worked with a Leaflet markercluster plug-in to improve the performance and usability of the geJSON files in Mapbox map/Leaflet layers

### Machine Learning
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In reviewing all the data provided by JourneyNorth going back to 1996, we graphed the data by year and discovered a massive spike in engagement in August 2010. From 2000-2009, there were between 3 and 167 sightings per year. In 2010, the number of observations spike to 3,287 and then grow from there. In February 2010, JourneyNorth created a Facebook page, and it is our speculation that social media along with broader discussions about climate change, were primary factors in the explosion of the dataset. The numbers level out in 2016 and fluctuate around 14,000 observations, +/-500. This is what a linear regression (fitted with PolynomialFeatures) line looks like for all the data, dating back to 1996: <br>
![image](https://user-images.githubusercontent.com/24308495/156938993-0fd4e143-6f64-4164-9cd4-910215173970.png)<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To take a better look at the data with machine learning, we created a system that analyzes butterfly observations within a square grid using user inputs for North latitude, South latitude, East longitude, and West longitude. We then took the Northern, Southern, Eastern, and Western points of major regions and used those to graph regression line for butterfly observations over time. (Note: Since the box we created is not as precise as the municipal or state boundaries, the data is an approximation that encompasses some additional area nearby the defined region.) We made a better fit to the regression line by using PolynomialFeatures, so the line conformed closer to individual data points instead of being a straight line. The regions we analyzed were Minneapolis, New York City, Oklahoma City, and Rhode Island: <br>
- Minneapolis:<br>
    2016-2021<br>
    ![image](https://user-images.githubusercontent.com/24308495/156939589-d8fd6971-8ddb-443e-9baa-30ee224023da.png)<br>
    Note: 736000-737400 reflects the 2016-2021 date range <br>
    <br>
    2010-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156939643-2425712b-bb1f-4ad3-8659-a44eccc2dd4a.png)<br>
    Note: 734000-737500 reflects the 2016-2021 date range <br>
    <br>
    We studied Minneapolis because of it is a major metro area with a signficant amount of green space and has a reputation for ecologically-mindful population. Of the regions we studied, Minneapolis has the smallest population.<br>
    <br>
- New York City <br>
    2016-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156940188-28fa9003-e143-4877-a8c1-683c11ac8706.png) <br>
    Note: 736000-737400 reflects the 2016-2021 date range <br>
    <br>
    2010-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156940303-2070a02e-abcc-4a8d-b4d2-e94b557def91.png) <br>
    Note: 734000-737500 reflects the 2016-2021 date range <br>
    <br>
    We studied New York City because it has a high-population density over a large area of urban land. <br>
    <br>
- Rhode Island: <br>
    2016-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156940478-652b75ba-82d3-4ccc-95b4-db9206f245c3.png) <br>
    Note: 736000-737400 reflects the 2016-2021 date range <br>
    <br>
    2010-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156940531-70318095-2410-43f5-8a5a-d557b03685a7.png) <br>
    Note: 734000-737500 reflects the 2016-2021 date range <br>
    <br>
    We studied Rhode Island because it is a region that is four times the size of New York but only 1/8th the population; Rhode Island's population density is significantly less than New York. We wanted to contrast observations in New York to a nearby region that has a similar butterfly migratory path running through it, but has a larger space and fewer people. <br>
    <br>
- Oklahoma City <br>
    2016-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156941018-ca83a9c8-4f08-4e4e-a405-bad570b21496.png) <br>
    Note: 736000-737400 reflects the 2016-2021 date range <br>
    <br>
    2010-2021 <br>
    ![image](https://user-images.githubusercontent.com/24308495/156941062-916fee87-46c0-4512-a349-93707ee00045.png) <br>
    Note: 734000-737500 reflects the 2016-2021 date range <br>
    <br>
    We studied Oklahoma City because there is a convergence of butterfly migratory paths that run through it. Three migratory paths journeying South and two migratory groups journeying North run through or near it. We were also interested because, based on correlations with political trends, the region may have a less-positive view of ecological protection than Minneapolis. <br>
<br>
Regression was chosen on these regions to see the change in butterfly observations over time. Prior to 2010, there were very few butterfly observations for these individual regions. From 2010 to 2015, there was a steady incline in observations. The level of observations for the entire dataset seems to plateau between 2016 and 2021; these are the years in which we thought it was most valuable to compare regional observations. In reviewing the above charted regions, there's no clear trends that surface which apply to each region other than a potential slight decline. <br>

### Next Steps for ML

The next steps for machine learning would be to analyze whether there are correlations between butterfly observations and the following features: <br>
* Regional Population <br>
* Population Density <br>
* Square Miles of Region <br>
* Square Miles of Green Space <br>
* Green Space Density <br>
* Population Attitude for Ecology (based on polling) <br>
* Butterfly Migratory Density (based on mapped migratory patterns) <br>
<br>
In addition to aggregate Butterfly Observations as the target variable, it may also be worthwhile to anaylze a second target variable: Butterfly Observation Density. This variable would analyze the number of observations over a period with a squared distance measurements. <br>
<br>
The above regression analysis points in a few directions for how the above features may play out over a larger logistic regression. For example, based on New York, we would expect a low butterfly count, despite a high population, for dense urban regions. The Minneapolis suggests that having a large amount of green space and a reputedly eco-friendly population lends itself to a higher count in butterfly observations. Rhode Island suggests that having large unpopulated areas and sprawling suburbs may not necessarily increase the butterfly count. Finally, Oklahoma City suggests that a primary variable in butterfly observations may be how many butterflies pass through the area. No correlation can be drawn from the above information, however the above analysis serves as a reasonable sign post to guide us on our path.

### Software
* Python 3.6.1 / Visual Studio Code 1.38.1 / Mapbox / Leaflet / Leaflet markercluster plug-in

### Data
* North_Project_MonarchsAndMilkweed_1996-2020: https://portal.edirepository.org/nis/mapbrowse?packageid=edi.949.1<br>
* Source for data on recoveries of tagged monarchs: https://monarchwatch.org/tagging/index.html#recoveries<br>
* Tag recoveries from central Mexico: https://docs.google.com/spreadsheets/d/1UdJfooBJrm0Y1zlpwIhGz7ToZfP9h8OeucJbXrWwZEY/edit?usp=sharing<br>
* Tag recoveries from the U.S., Canada, & northen Mexico (2021 season): https://docs.google.com/spreadsheets/d/12h0oQrTA9Zbm4nEkUFJJzWk5_FN2se4VAzI0Ww5d1E8/edit#gid=1710298744<br>
* Tag recoveries from the U.S., Canada, & northen Mexico (2020 season): https://docs.google.com/spreadsheets/d/1nCK0z3Ab9QOly9sWN9AbItGYBs576CNXpyKs5puLdjY/edit#gid=1710298744<br>
* Tag recoveries from the U.S., Canada, & northen Mexico (2019 season): https://docs.google.com/spreadsheets/d/1GKkZIEXjI5BjOOvNo40hsCJoWNJq2pucj01GpQVFynM/edit#gid=1710298744<br>
* Tag recoveries from the U.S., Canada, & northen Mexico (2018 season): https://docs.google.com/spreadsheets/d/1tRDhq0zfOhlErRK7oeqpb-AHFsARuN15JwdT9qWvlHc/edit#gid=992068986<br>
* Tag recoveries from the U.S. (2017 season): https://docs.google.com/spreadsheets/d/1ySyeKlpQTTwD1pPEO0XmouL7uudckaxaZnBBhilukCA/edit#gid=1287716066<br>
* MWatch_occurrences_1996_2000: https://bison.usgs.gov/ipt/resource?r=monarchwatch<br>
* Source for current and future Journey North Data: https://journeynorth.org/sightings/<br>

### Resources
* pandas.DataFrame.to_json: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html<br>
* leafletjs quick start guide: https://leafletjs.com/examples/quick-start/<br>
* mapbox styles: https://docs.mapbox.com/api/maps/styles/<br>
* leafletjs: https://leafletjs.com/reference.html<br>
* leafletjs download page: https://leafletjs.com/download.html<br>
* Mozilla Developer's page: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity<br>
* mapbox glossary: https://docs.mapbox.com/help/glossary/<br>
* mapbox glossary static tiles api: https://docs.mapbox.com/help/glossary/static-tiles-api/<br>
* mapbox static tiles api documentation: https://docs.mapbox.com/api/maps/#static-tiles<br>
* mapbox styles:https://docs.mapbox.com/api/maps/#styles<br>
* leaflet documentation on methods using the map objecct and tile layers: https://leafletjs.com/reference-1.6.0.html#map-example<br>
* creative commons: https://creativecommons.org/<br>
* bindPopup() method: https://leafletjs.com/reference-1.6.0.html#popup<br>

For more information on our project check out https://github.com/MeganKRiley/Analytics_Group_Repo
