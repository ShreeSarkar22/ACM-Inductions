# Crypto Manager

This is a project to manage your crypto tokens, made using HTML, CSS and JavaScript.

Key Highlights :
    1. Here, only 3 tokens  : Bitcoin, Ethereum, Binance Coin is used.
    2. The current value of the tokens are displayed on the extreme right column. This price is displayed in INR. The prices are fetched by Coingecko API.
    3. The second column form left shows the balance of the tokens , that is , the number of tokens we have ( by default it's zero )
    4. The third column from left shows the balance of tokens in INR.
    5. The fourth column is for buying the tokens. You can type in the number of tokens or just increment or decrement it using the arrows and click the button or press Enter key.
    6. The fifth column is for selling the tokens and it works in a way similar to the column for buying.
    7. There is pie chart below the tables. It dynamically updates based on how many tokens are currently present. If the balance of all the tokens is zero, then pie-chart wont be visible.

Important :
It takes some time to get the current price of the crypto and sometimes it displays the message "Error Fetching Price". This issue is due to network problems.
Some ways to tackle it include :
      1. Refreshing the page
      2. Restarting the server
      3. Making a new live preview

There is a dynamic piechart below the tables. To view it, you must have atleast one token of any kind.
