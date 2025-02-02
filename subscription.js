document.getElementById("track-cycle").addEventListener("click", function() {
    showSubscriptionPage();
});

function showSubscriptionPage() {
    document.querySelector(".content").innerHTML = `
        <div class="subscription-container">
            <h2>Your Personalized Cycle Tracking Awaits</h2>
            <p>Unlock full access to cycle insights, symptom tracking, and detailed reports.</p>
            
            <div class="subscription-options">
                <div class="plan">
                    <p class="save-tag">Save 66%</p>
                    <h3>Yearly Plan</h3>
                    <p class="price">₹491.67 / month</p>
                    <p class="total-price">12 months • ₹5,900</p>
                </div>
                <div class="plan">
                    <h3>Monthly Plan</h3>
                    <p class="price">₹1,449 / month</p>
                </div>
            </div>

            <button class="subscribe-btn">Subscribe Now</button>
            <p class="trial-toggle">Not sure yet? <span>Start a free trial</span></p>
        </div>
    `;
}