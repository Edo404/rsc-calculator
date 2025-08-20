// Sector multiples
const sectorMultiples = {
    tech: 15,
    pharma: 12,
    agriculture: 6,
    finance: 10,
    retail: 8,
    manufacturing: 7,
    energy: 9,
    healthcare: 11,
    realestate: 14,
    telecom: 8
};

// Form submission handler
document.getElementById('valuationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateValuation();
});

function calculateValuation() {
    // Get input values
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;
    const costRevenue = parseFloat(document.getElementById('costRevenue').value) || 0;
    const sga = parseFloat(document.getElementById('sga').value) || 0;
    const da = parseFloat(document.getElementById('da').value) || 0;
    const otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;
    const sector = document.getElementById('sector').value;

    // Validate sector selection
    if (!sector) {
        alert('Please select a sector');
        return;
    }

    // Calculate EBIT
    const ebit = revenue - costRevenue - sga - da - otherCosts;

    // Calculate EBITDA
    const ebitda = ebit + da;

    // Get sector multiple
    const multiple = sectorMultiples[sector];

    // Calculate company valuation
    const valuation = ebitda * multiple;

    // Display results
    displayResults(ebit, ebitda, valuation);
}

function displayResults(ebit, ebitda, valuation) {
    // Format numbers
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    };

    // Update result values
    document.getElementById('ebitResult').textContent = formatNumber(ebit);
    document.getElementById('ebitdaResult').textContent = formatNumber(ebitda);
    document.getElementById('valuationResult').textContent = formatNumber(valuation);

    // Show modal
    document.getElementById('resultsModal').classList.add('active');
}

function closeModal() {
    document.getElementById('resultsModal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('resultsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});