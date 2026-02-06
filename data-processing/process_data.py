import pandas as pd
import json
import numpy as np
from pathlib import Path
from datetime import datetime

class GoogleAdsDataProcessor:
    """
    Professional data processor for Google Ads campaign data.
    Converts Excel sheets to clean JSON files for frontend consumption.
    """
    
    def __init__(self, excel_path):
        self.excel_path = Path(excel_path)
        self.output_dir = Path('../data/processed')
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Load all sheets
        print(f"📊 Loading data from {self.excel_path.name}...")
        self.excel_file = pd.ExcelFile(self.excel_path)
        self.sheets = {}
        
        for sheet_name in self.excel_file.sheet_names:
            self.sheets[sheet_name] = pd.read_excel(
                self.excel_file, 
                sheet_name=sheet_name
            )
            print(f"  ✓ Loaded sheet: {sheet_name} ({len(self.sheets[sheet_name])} rows)")
    
    def clean_currency(self, value):
        """Convert currency strings to float"""
        if pd.isna(value) or value == 0:
            return 0.0
        if isinstance(value, str):
            # Remove ₹ symbol and commas
            return float(value.replace('₹', '').replace(',', '').strip())
        return float(value)
    
    def clean_percentage(self, value):
        """Convert percentage to decimal"""
        if pd.isna(value):
            return 0.0
        if isinstance(value, str):
            return float(value.strip('%')) / 100
        return float(value)
    
    def process_biggest_changes(self):
        """Process campaign changes data"""
        print("\n🔄 Processing Biggest Changes...")
        
        df = self.sheets.get('Biggest_changes(2025.11.03-2026')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        # Clean currency columns
        currency_cols = ['Cost', 'Cost (Comparison)']
        for col in currency_cols:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_currency)
        
        # Calculate metrics
        df['Cost_Change'] = df['Cost'] - df['Cost (Comparison)']
        df['Cost_Change_Percent'] = (df['Cost_Change'] / df['Cost (Comparison)'].replace(0, np.nan) * 100).fillna(0)
        df['Clicks_Change'] = df['Clicks'] - df['Clicks (Comparison)']
        df['Interactions_Change'] = df['Interactions'] - df['Interactions (Comparison)']
        
        # Save to JSON
        output = {
            'data': df.to_dict('records'),
            'summary': {
                'total_campaigns': len(df),
                'total_cost_current': float(df['Cost'].sum()),
                'total_cost_previous': float(df['Cost (Comparison)'].sum()),
                'total_clicks_current': int(df['Clicks'].sum()),
                'total_clicks_previous': int(df['Clicks (Comparison)'].sum())
            }
        }
        
        self.save_json(output, 'biggest_changes.json')
        print(f"  ✓ Processed {len(df)} campaigns")
    
    def process_time_series(self):
        """Process time series data"""
        print("\n📈 Processing Time Series...")
        
        df = self.sheets.get('Time_series(2025.11.03-2026.02.')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        # Clean data
        df['Date'] = pd.to_datetime(df['Date'])
        df['Avg. CPC'] = df['Avg. CPC'].apply(self.clean_currency)
        
        # Add derived features
        df['Day_of_Week'] = df['Date'].dt.day_name()
        df['Week_Number'] = df['Date'].dt.isocalendar().week
        df['Month'] = df['Date'].dt.month_name()
        
        # Calculate moving averages
        df['CTR_MA7'] = df['CTR'].rolling(window=7, min_periods=1).mean()
        df['CPC_MA7'] = df['Avg. CPC'].rolling(window=7, min_periods=1).mean()
        
        # Save to JSON
        output = {
            'data': df.to_dict('records'),
            'summary': {
                'date_range': {
                    'start': df['Date'].min().strftime('%Y-%m-%d'),
                    'end': df['Date'].max().strftime('%Y-%m-%d')
                },
                'total_clicks': int(df['Clicks'].sum()),
                'total_impressions': int(df['Impressions'].sum()),
                'avg_ctr': float(df['CTR'].mean()),
                'avg_cpc': float(df['Avg. CPC'].mean())
            }
        }
        
        self.save_json(output, 'time_series.json')
        print(f"  ✓ Processed {len(df)} days of data")
    
    def process_search_terms(self):
        """Process search terms data"""
        print("\n🔍 Processing Search Terms...")
        
        # Process Word-level data
        df_words = self.sheets.get('Searches(Word_2025.11.03-2026.0')
        if df_words is not None:
            df_words['Cost'] = df_words['Cost'].apply(self.clean_currency)
            
            # Calculate efficiency metrics
            df_words['Cost_Per_Click'] = (df_words['Cost'] / df_words['Clicks'].replace(0, np.nan)).fillna(0)
            df_words['CTR'] = (df_words['Clicks'] / df_words['Impressions'].replace(0, np.nan)).fillna(0)
            df_words['Conversion_Rate'] = (df_words['Conversions'] / df_words['Clicks'].replace(0, np.nan)).fillna(0)
            
            # Flag inefficient keywords (high cost, no conversions)
            df_words['Inefficient'] = (df_words['Cost'] > 50) & (df_words['Conversions'] == 0)
            
            self.save_json(df_words.to_dict('records'), 'search_words.json')
            print(f"  ✓ Processed {len(df_words)} search words")
        
        # Process Search-level data
        df_search = self.sheets.get('Searches(Search_2025.11.03-2026')
        if df_search is not None:
            df_search['Cost'] = df_search['Cost'].apply(self.clean_currency)
            
            # Calculate metrics
            df_search['CTR'] = (df_search['Clicks'] / df_search['Impressions'].replace(0, np.nan)).fillna(0)
            df_search['Cost_Per_Click'] = (df_search['Cost'] / df_search['Clicks'].replace(0, np.nan)).fillna(0)
            
            self.save_json(df_search.to_dict('records'), 'search_queries.json')
            print(f"  ✓ Processed {len(df_search)} search queries")
    
    def process_devices(self):
        """Process device performance data"""
        print("\n📱 Processing Device Data...")
        
        df = self.sheets.get('Devices(2025.11.03-2026.02.03)')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        df['Cost'] = df['Cost'].apply(self.clean_currency)
        
        # Calculate metrics
        df['CTR'] = (df['Clicks'] / df['Impressions'].replace(0, np.nan)).fillna(0)
        df['Cost_Per_Click'] = (df['Cost'] / df['Clicks'].replace(0, np.nan)).fillna(0)
        df['Cost_Per_Impression'] = (df['Cost'] / df['Impressions'].replace(0, np.nan)).fillna(0)
        
        output = {
            'data': df.to_dict('records'),
            'summary': {
                'total_cost': float(df['Cost'].sum()),
                'total_clicks': int(df['Clicks'].sum()),
                'total_impressions': int(df['Impressions'].sum())
            }
        }
        
        self.save_json(output, 'devices.json')
        print(f"  ✓ Processed {len(df)} device types")
    
    def process_networks(self):
        """Process network performance data"""
        print("\n🌐 Processing Network Data...")
        
        df = self.sheets.get('Networks(2025.11.03-2026.02.03)')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        df['Cost'] = df['Cost'].apply(self.clean_currency)
        df['Avg. CPC'] = df['Avg. CPC'].apply(self.clean_currency)
        
        self.save_json(df.to_dict('records'), 'networks.json')
        print(f"  ✓ Processed {len(df)} networks")
    
    def process_day_hour(self):
        """Process day and hour performance data"""
        print("\n⏰ Processing Day & Hour Data...")
        
        # By hour
        df_hour = self.sheets.get('Day_&_Hour(by hour)')
        if df_hour is not None:
            self.save_json(df_hour.to_dict('records'), 'performance_by_hour.json')
            print(f"  ✓ Processed hourly data (24 hours)")
        
        # By day
        df_day = self.sheets.get('Day_&_Hour(by-day)')
        if df_day is not None:
            self.save_json(df_day.to_dict('records'), 'performance_by_day.json')
            print(f"  ✓ Processed daily data (7 days)")
        
        # By each hour (detailed)
        df_detailed = self.sheets.get('Day_&_Hour(by-each-hour)')
        if df_detailed is not None:
            # Create heatmap data
            heatmap = df_detailed.pivot_table(
                values='Impressions',
                index='Day',
                columns='Start Hour',
                fill_value=0
            )
            
            output = {
                'raw_data': df_detailed.to_dict('records'),
                'heatmap': {
                    'days': heatmap.index.tolist(),
                    'hours': heatmap.columns.tolist(),
                    'values': heatmap.values.tolist()
                }
            }
            
            self.save_json(output, 'performance_heatmap.json')
            print(f"  ✓ Processed detailed hour data (168 hour-day combinations)")
    
    def process_campaigns(self):
        """Process campaign overview data"""
        print("\n📊 Processing Campaign Data...")
        
        df = self.sheets.get('campaigns')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        df['Cost'] = df['Cost'].apply(self.clean_currency)
        
        # Calculate additional metrics
        df['Impressions_Estimated'] = (df['Clicks'] / df['CTR'].replace(0, np.nan)).fillna(0)
        
        # Categorize campaigns by status and performance
        df['Performance_Category'] = pd.cut(
            df['CTR'],
            bins=[0, 0.02, 0.04, 1],
            labels=['Low', 'Medium', 'High']
        )
        
        output = {
            'data': df.to_dict('records'),
            'summary': {
                'total_campaigns': len(df),
                'enabled_campaigns': len(df[df['Campaign Status'] == 'Enabled']),
                'paused_campaigns': len(df[df['Campaign Status'] == 'Paused']),
                'total_cost': float(df['Cost'].sum()),
                'total_clicks': int(df['Clicks'].sum()),
                'avg_ctr': float(df['CTR'].mean())
            }
        }
        
        self.save_json(output, 'campaigns.json')
        print(f"  ✓ Processed {len(df)} campaigns")
    
    def process_optimization_score(self):
        """Process optimization score data"""
        print("\n⭐ Processing Optimization Scores...")
        
        df = self.sheets.get('Optimisation_score(2025.11.03-2')
        if df is None:
            print("  ⚠️ Sheet not found")
            return
        
        # Convert to percentage if needed
        if df['Optimisation score'].max() <= 1:
            df['Optimisation score'] = df['Optimisation score'] * 100
        
        output = {
            'data': df.to_dict('records'),
            'summary': {
                'avg_score': float(df['Optimisation score'].mean()),
                'min_score': float(df['Optimisation score'].min()),
                'max_score': float(df['Optimisation score'].max())
            }
        }
        
        self.save_json(output, 'optimization_scores.json')
        print(f"  ✓ Processed {len(df)} campaign scores")

    def save_json(self, data, filename):
        """Save data to JSON file"""
        output_path = self.output_dir / filename
        
        # Convert numpy types and handle NaN values
        def convert_types(obj):
            if isinstance(obj, (np.integer, int)):
                return int(obj)
            elif isinstance(obj, (np.floating, float)):
                # Handle NaN, infinity
                if np.isnan(obj) or np.isinf(obj):
                    return 0  # Convert NaN/Inf to 0
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            elif isinstance(obj, pd.Timestamp):
                return obj.strftime('%Y-%m-%d')
            elif pd.isna(obj):
                return 0  # Convert pandas NA to 0
            return obj
        
        # Recursively clean the data
        def clean_data(obj):
            if isinstance(obj, dict):
                return {k: clean_data(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [clean_data(item) for item in obj]
            else:
                return convert_types(obj)
        
        cleaned_data = clean_data(data)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, indent=2, ensure_ascii=False)
        
        print(f"    💾 Saved: {filename}")
    
    def process_all(self):
        """Process all data sheets"""
        print("\n" + "="*60)
        print("🚀 GOOGLE ADS DATA PROCESSING STARTED")
        print("="*60)
        
        self.process_biggest_changes()
        self.process_time_series()
        self.process_search_terms()
        self.process_devices()
        self.process_networks()
        self.process_day_hour()
        self.process_campaigns()
        self.process_optimization_score()
        
        print("\n" + "="*60)
        print("✅ DATA PROCESSING COMPLETED SUCCESSFULLY!")
        print(f"📁 Output directory: {self.output_dir.absolute()}")
        print("="*60 + "\n")


# Main execution
if __name__ == "__main__":
    # Path to your Excel file
    excel_path = "../data/raw/Biggest_changes(2025.11.03-2026.02.03_compared_to_2025.08.02-2025.11.02).xlsx"
    
    try:
        processor = GoogleAdsDataProcessor(excel_path)
        processor.process_all()
    except FileNotFoundError:
        print(f"❌ Error: Excel file not found at {excel_path}")
        print("Please make sure the file is in the data/raw folder")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()