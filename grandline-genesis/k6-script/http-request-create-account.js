import { check } from "k6"
import http from "k6/http"
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
    const url = "http://localhost:8080/api/v1/account"
    const data = {
        identifier: uuidv4(),
        password: "test-password"
    }
    const response = http.post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    })
    check(response, {
        "is success": (r) => r.status/100 === 2
    })
}