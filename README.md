# Coal Theft Detection Model
## Overview
Coal theft during transportation is a major challenge in the mining industry, leading to financial losses, inefficiencies, and safety risks. Traditional monitoring approaches lack the precision and immediacy needed to combat this issue effectively. Our Coal Theft Detection Model aims to enhance security in coal transportation through real-time IoT solutions, environmental and load monitoring, and data analytics.

This project combines real-time GPS tracking, load sensors, and a data analytics dashboard to provide a holistic approach for monitoring coal transport. By integrating these technologies, the model enables quick detection of theft, identifies tampering through sudden changes in load and weight, and facilitates efficient, data-driven decision-making.

## Key Features
1-Real-Time GPS Tracking: Tracks transport vehicles continuously, providing live location data to ensure accountability.
2-Load and Environmental Sensors: Detects anomalies in load weight and environmental conditions, signaling potential tampering.
3-Automated Alerts: Triggers alerts for suspicious activities, including sudden weight changes or unauthorized stops.
4-Centralized Data Analytics Dashboard: Visualizes real-time data, generates reports, and helps in analyzing transportation patterns.
5-Enhanced Security and Accountability: Strengthens the security of coal transit with quick-response mechanisms and transparent data flow.
## Impact
1-Reduced Theft: Real-time tracking and load monitoring significantly decrease theft incidents.
2-Operational Efficiency: Streamlined coal transport processes with minimal delays and optimized routes.
3-Data-Driven Insights: Aggregates transportation data to reveal patterns and trends for resource allocation.
4-Increased Stakeholder Trust: Enhanced transparency boosts trust among stakeholders by securing the coal supply chain.
Project Structure

```
.
├── data/                   # Contains sample and real-time data files (simulated or actual)
├── sensors/                # Sensor data processing and simulation modules
├── gps_tracking/           # GPS tracking and vehicle monitoring module
├── analytics/              # Data analytics and dashboard generation
├── alerting_system/        # Automated alerts and notifications for anomalies
├── tests/                  # Unit tests and integration tests
├── LICENSE
└── README.md               # Project documentation
```
## Installation
1-Clone the Repository

```
Copy code
git clone https://github.com/utkarshupdy/Coal_Theft_Detection_Model.git
cd Coal_Theft_Detection_Model
```
2-Install Dependencies

```
Copy code
pip install -r requirements.txt
```
3-Set Up Environment Variables

4-Set up .env with API keys and other necessary configurations for GPS and alert services.
## Usage
1-Initialize Sensors and Tracking: Run the main script to start data collection and GPS tracking.

```
Copy code
python main.py
```
2-View Analytics Dashboard: Access the analytics dashboard locally to view real-time data and reports.

3-Set Up Alerting System: Configure alerts for anomalies such as unexpected weight changes.

## How It Works
1-Data Collection: Sensors capture load weight and environmental data, GPS provides real-time location tracking.
2-Data Processing: Aggregated data is processed and analyzed for anomalies.
3-Real-Time Alerts: Any suspicious activity triggers automated alerts, notifying relevant personnel.
4-Visualization: Data is displayed on a centralized dashboard, enabling easy monitoring and decision-making.
## Contributing
1-Contributions to enhance model accuracy, add new features, or fix issues are welcome. Fork the repository and create a pull request with your suggested changes.

## License
This project is licensed under the MIT License. See LICENSE for more details.

## Acknowledgments
This project was developed with support from the IoT Solutions and Data Analytics teams, as well as with valuable insights from stakeholders in the coal transportation industry.

