document.addEventListener("DOMContentLoaded", () => {
  const dayInput = document.getElementById("day")
  const monthInput = document.getElementById("month")
  const yearInput = document.getElementById("year")
  const checkButton = document.getElementById("checkButton")
  const resultContainer = document.getElementById("resultContainer")
  const resultMessage = document.getElementById("resultMessage")
  const birthdayLinkContainer = document.getElementById("birthdayLinkContainer")

  // Make sure the birthday link is hidden initially
  birthdayLinkContainer.style.display = "none"

  checkButton.addEventListener("click", () => {
    // Reset everything first
    resultContainer.classList.add("hidden")
    birthdayLinkContainer.style.display = "none"

    // Check if inputs are valid
    if (!dayInput.value || !monthInput.value || !yearInput.value) {
      return
    }

    const day = Number.parseInt(dayInput.value, 10)
    const month = Number.parseInt(monthInput.value, 10)
    const year = Number.parseInt(yearInput.value, 10)

    // Check for special date (22/05/2005)
    const isSpecialDate = day === 22 && month === 5 && year === 2005

    // Calculate age
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()

    // Adjust age if birthday hasn't occurred yet this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    // Show result container
    resultContainer.classList.remove("hidden")

    // Determine if eligible to drive
    if (age >= 18) {
      resultContainer.className = "result-container success"
      resultMessage.className = "result-message success"
      resultMessage.textContent = "You are eligible to drive!"

      // ONLY show birthday link for the special date
      if (isSpecialDate) {
        birthdayLinkContainer.style.display = "block"
      }
    } else {
      resultContainer.className = "result-container error"
      resultMessage.className = "result-message error"
      resultMessage.textContent = "You are not eligible to drive yet. You need to be 18 years old."
    }
  })
})
