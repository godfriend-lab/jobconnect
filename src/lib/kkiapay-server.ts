// @ts-nocheck

const KKIAPAY_API_URL = process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === 'true'
  ? 'https://sandbox.kkiapay.me/api/v1'
  : 'https://api.kkiapay.me/api/v1'

const PRIVATE_KEY = process.env.KKIAPAY_PRIVATE_KEY

/**
 * Vérifier le statut d'une transaction
 */
export async function verifyTransaction(transactionId: string) {
  try {
    const response = await fetch(`${KKIAPAY_API_URL}/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': PRIVATE_KEY,
        'X-Api-Key': PRIVATE_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Erreur vérification transaction:', error)
    throw error
  }
}

/**
 * Rembourser une transaction
 */
export async function refundTransaction(transactionId: string, amount?: number) {
  try {
    const response = await fetch(`${KKIAPAY_API_URL}/transactions/${transactionId}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': PRIVATE_KEY,
        'X-Api-Key': PRIVATE_KEY,
      },
      body: JSON.stringify({
        amount: amount, // Optionnel (remboursement partiel)
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur remboursement: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Erreur remboursement:', error)
    throw error
  }
}

/**
 * Lister les transactions d'un marchand
 */
export async function listTransactions(page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${KKIAPAY_API_URL}/transactions?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': PRIVATE_KEY,
          'X-Api-Key': PRIVATE_KEY,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Erreur liste: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Erreur liste transactions:', error)
    throw error
  }
}