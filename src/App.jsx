import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you can add logic to handle the submitted data
  }

  return (
    <>
      <h1 style={{textAlign:'center'}}>🌸Iris Measurement Form🌸</h1>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-input'>
          <div className='form-labels'>
            <label htmlFor="sepalLength">Sepal Length:</label>
            <label htmlFor="sepalWidth">Sepal Width:</label>
            <label htmlFor="petalLength">Petal Length:</label>
            <label htmlFor="petalWidth">Petal Width:</label>
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
      </form>
    </>
  )
}

export default App