#include<bits/stdc++.h>

#define int long long int
#define F first
#define S second
#define pb push_back

using namespace std;

const int N = 1e4;

string k;
int d, apaar = 1e9 + 7;
int memo[N][2][100];

int dp(int i, bool last, int mod) {
	if (i == k.size()) {
		return (mod == 0);
	}

	int &ans = memo[i][last][mod];
	if (ans != -1) return ans;

	ans = 0;

	int till = last ? (k[i] - '0') : 9;

	for (int digits = 0; digits <= till; digits++) {
		ans += dp(i + 1, last && (digits == till), (mod + digits) % d);
		ans %= apaar;
	}

	return ans;
}

int32_t main() {

#ifndef ONLINE_JUDGE
	freopen("input.txt", "r", stdin);
	freopen("output.txt", "w", stdout);
#endif

	cin >> k >> d;

	memset(memo, -1, sizeof(memo));

	cout << (dp(0, 1, 0) - 1 + apaar) % apaar;

	return 0;
}