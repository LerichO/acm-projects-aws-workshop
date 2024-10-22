import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: ''
  })

  const [classification, setClassification] = useState('Flower')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    setClassification('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios({
        method: 'post',
        url: import.meta.env.VITE_AWS_API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          x1: parseFloat(formData.sepalLength),
          x2: parseFloat(formData.sepalWidth),
          x3: parseFloat(formData.petalLength),
          x4: parseFloat(formData.petalWidth)
        }
      })

      // With axios, the response data is already parsed
      const flowerTypes = ['Setosa', 'Virginica', 'Versicolor']
      setClassification(flowerTypes[response.data.prediction] || 'Unknown')

    } catch (error) {
      console.error('Error:', error)
      // Axios specific error handling
      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data}`
        : 'Failed to get prediction. Please try again.'
      setError(errorMessage)
      setClassification('Error occurred')
    }
  }

  return (
    <>
      <h1>🌸Iris Prediction Form 🌸</h1>
      <h3>Input a given measurement for each feature for the machine learning model to predict what type of Iris the flower is.</h3>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-input'>
          <div className='form-labels'>
            <label htmlFor="sepalLength">Sepal Length (cm):</label>
            <label htmlFor="sepalWidth">Sepal Width (cm):</label>
            <label htmlFor="petalLength">Petal Length (cm):</label>
            <label htmlFor="petalWidth">Petal Width (cm):</label>
          </div>
          <div className='form-fields'>
            <input
              type="number"
              id="sepalLength"
              name="sepalLength"
              value={formData.sepalLength}
              onChange={handleChange}
              step="0.1"
              required
            />
            <input
              type="number"
              id="sepalWidth"
              name="sepalWidth"
              value={formData.sepalWidth}
              onChange={handleChange}
              step="0.1"
              required
            />
            <input
              type="number"
              id="petalLength"
              name="petalLength"
              value={formData.petalLength}
              onChange={handleChange}
              step="0.1"
              required
            />
            <input
              type="number"
              id="petalWidth"
              name="petalWidth"
              value={formData.petalWidth}
              onChange={handleChange}
              step="0.1"
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        <h3>I predict that this is a... {classification}</h3>
      </form>
      <div className="info-container">
        <h2>The Iris Dataset</h2>
        <p>The machine learning model that we have built within AWS Sagemaker, which this React app is making requests to, is trained using the Iris dataset from UC Irvine's Machine Learning Repository <span><a href="https://archive.ics.uci.edu/dataset/53/iris">here</a></span>. Each instance of the dataset consists of 4 features - sepal length, sepal width, petal length, and petal width - with each instance class resolving to a type of iris plant. Features are measured as floating point decimals.</p>
        <h2>Tutorial Resources</h2>
        <p>The AWS Sagemaker model is primarly based on the tutorial demo linked <span><a href="https://www.youtube.com/watch?v=OfzAl3K0s0U">here</a></span> and further information can be found through other tutorials, like this one <span><a href="https://youtu.be/stD47vPDadI?si=cqwHyunARQn-S8yx">here</a></span>, as well as <span><a href="https://youtu.be/uQc8Itd4UTs?si=MoRiqlK1_NRjRteZ">Amazon's own tutorials</a></span>.</p>
      </div>
    </>
  )
}

export default App