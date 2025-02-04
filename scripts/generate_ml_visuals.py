import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Set style for better-looking plots
plt.style.use('default')
sns.set_theme(style="whitegrid")

# Set consistent font sizes
plt.rcParams['font.size'] = 12
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['axes.titlesize'] = 16
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

def create_feature_importance_plot():
    # Generate sample data
    X, y = make_classification(
        n_samples=1000,
        n_features=10,
        n_informative=5,
        n_redundant=2,
        random_state=42
    )
    
    # Train model
    rf = RandomForestClassifier(random_state=42)
    rf.fit(X, y)
    
    # Get feature importances
    importances = rf.feature_importances_
    feature_names = [f'Feature {i+1}' for i in range(10)]
    
    # Create plot
    plt.figure(figsize=(12, 6))
    bars = plt.bar(feature_names, importances)
    
    # Color bars based on importance
    colors = plt.cm.viridis(np.linspace(0, 1, len(bars)))
    for bar, color in zip(bars, colors):
        bar.set_color(color)
    
    plt.title('Random Forest Feature Importance')
    plt.xlabel('Features')
    plt.ylabel('Importance Score')
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    # Save plot
    plt.savefig('src/assets/images/feature-importance.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_lime_explanation_plot():
    # Create a mock LIME explanation visualization
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Sample feature contributions
    features = ['Age', 'Income', 'Credit Score', 'Employment', 'Debt Ratio']
    contributions = [0.35, -0.25, 0.15, -0.1, 0.05]
    
    # Create horizontal bar chart
    bars = ax.barh(features, contributions)
    
    # Color positive and negative contributions differently
    for i, v in enumerate(contributions):
        if v > 0:
            bars[i].set_color('#2ecc71')  # Green for positive
        else:
            bars[i].set_color('#e74c3c')  # Red for negative
    
    # Add vertical line at x=0
    ax.axvline(x=0, color='black', linestyle='-', linewidth=0.5)
    
    # Customize plot
    ax.set_title('LIME Explanation for Loan Approval Prediction')
    ax.set_xlabel('Feature Contribution')
    
    # Add value labels on the bars
    for i, v in enumerate(contributions):
        if v > 0:
            ax.text(v, i, f'+{v:.2f}', va='center', fontweight='bold')
        else:
            ax.text(v, i, f'{v:.2f}', va='center', fontweight='bold')
    
    plt.tight_layout()
    
    # Save plot
    plt.savefig('src/assets/images/lime-explanation.png', dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == '__main__':
    create_feature_importance_plot()
    create_lime_explanation_plot()
    print("Visualizations have been created successfully!") 