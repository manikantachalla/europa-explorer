# Europa Navigator API

A Node.js/TypeScript project to simulate robot navigation on a grid, supporting both file-based and API-based input.

## 🚀 Installation

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd europa-navigator-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Build the project (if needed)**
   ```sh
   npm run build
   ```

## 🏃 Running the Simulator

### 1. File Input Mode

You can run the simulator directly using a file input:

- **Default input file:**  
  ```sh
  npm run file-input
  ```
  This will use `input.txt` in the project root.

- **Custom input file:**  
  ```sh
  npm run file-input inputFile=abc.txt
  ```
  Replace `abc.txt` with your file name.

### 2. API Mode

1. **Start the server:**
   ```sh
   npm start
   ```

2. **API Documentation:**  
   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for Swagger UI.

3. **Test the API:**  
   - Use the Swagger UI or Postman to send requests to `/simulate`.
   - Example request body:
     ```json
     {
       "grid": [5, 5],
       "robots": [
         {
           "start": { "x": 1, "y": 2, "orientation": "N" },
           "instructions": ["L", "M", "L", "M", "L", "M", "L", "M", "M"]
         }
       ]
     }
     ```

## ⚠️ Edge Cases & Notes

- **Occupied Cells:**  
  If a robot attempts to move into a cell already occupied by another robot, it will skip the move and remain in its current position.
- **Out-of-Bounds:**  
  Robots will not move outside the grid boundaries.
- **Invalid Input:**  
  The API and file input will validate the input format and return errors for invalid requests.

## 🛠️ Requirements

- Node.js (v16+ recommended)
- npm

## 📂 Project Structure

- `src/` - Source code
- `input.txt` - Default input file for file mode
- `README.md` - This file

## 🤝 Contributing

Feel free to open issues or submit pull requests!

---