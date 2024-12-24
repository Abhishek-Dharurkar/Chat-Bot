from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_bot_response():
    user_message = request.json.get("message", "").strip().lower()
    
    # Shopping-related questions and answers
    if "available" in user_message:
        bot_message = "Yes, the product is available! You can add it to your cart and proceed to checkout."
    elif "shipping" in user_message:
        bot_message = "We offer free shipping for orders above 50. Delivery typically takes 3-5 business days."
    elif "return" in user_message:
        bot_message = "You can return products within 30 days of purchase. Please ensure the item is unused and in its original packaging."
    elif "discount" in user_message or "offer" in user_message:
        bot_message = "We currently have a 10% discount on all items for first-time customers. Use the code WELCOME10 at checkout!"
    elif "payment" in user_message:
        bot_message = "We accept credit/debit cards, PayPal, and UPI payments for your convenience."
    elif "support" in user_message:
        bot_message = "Our customer support is available 24/7. You can contact us at support@shop.com or call 1-800-123-456."
    elif "ok" in user_message:
        bot_message = "Thanks chat with any time...."
    else:
        bot_message = "I'm not sure how to answer that. Could you please provide more details?"
    
    return jsonify({"bot_message": bot_message})

if __name__ == '__main__':
    app.run(debug=True)
