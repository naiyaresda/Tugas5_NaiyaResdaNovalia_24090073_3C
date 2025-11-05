document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMenu");
  const menuList = document.getElementById("menuList");
  const orderList = document.getElementById("orderList");
  const totalHargaElem = document.getElementById("totalHarga");
  const fotoInput = document.getElementById("foto");
  const preview = document.getElementById("preview");

  const defaultImage = "https://cdn-icons-png.flaticon.com/512/857/857681.png";
  let totalHarga = 0;

  // Preview otomatis saat mengetik URL gambar
  fotoInput.addEventListener("input", () => {
    const url = fotoInput.value.trim();
    if (url) {
      preview.innerHTML = `<img src="${url}" alt="Preview Gambar" onerror="this.onerror=null; this.src='${defaultImage}'">`;
      preview.style.display = "block";
    } else {
      preview.innerHTML = "";
      preview.style.display = "none";
    }
  });

  // Tambah menu baru
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const harga = document.getElementById("harga").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const foto = fotoInput.value.trim() || defaultImage;

    const hargaAngka = Number(harga.replace(/\./g, ""));

    console.log("Menu baru ditambahkan:");
    console.log("Nama:", nama);
    console.log("Harga:", hargaAngka);
    console.log("Deskripsi:", deskripsi);
    console.log("Foto URL:", foto);

    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
      <img src="${foto}" alt="${nama}" onerror="this.onerror=null; this.src='${defaultImage}';">
      <div class="menu-info">
        <h3>${nama}</h3>
        <p>${deskripsi}</p>
        <p class="harga">Rp ${hargaAngka.toLocaleString("id-ID")}</p>
        <button class="tambah-btn">➕ Tambah ke Pesanan</button>
      </div>
    `;

    // Tambah event listener untuk tombol “Tambah ke Pesanan”
    menuItem.querySelector(".tambah-btn").addEventListener("click", () => {
      tambahKePesanan(nama, hargaAngka);
    });

    menuList.appendChild(menuItem);

    // Reset form dan sembunyikan preview
    form.reset();
    preview.innerHTML = "";
    preview.style.display = "none";
  });

  // Fungsi untuk menambah ke pesanan
  function tambahKePesanan(nama, harga) {
    const orderItem = document.createElement("li");
    orderItem.classList.add("flex", "justify-between", "items-center", "bg-pink-50", "p-3", "rounded-lg", "shadow-sm");

    orderItem.innerHTML = `
      <span>${nama}</span>
      <span>Rp ${harga.toLocaleString("id-ID")}</span>
    `;

    orderList.appendChild(orderItem);

    // Update total harga
    totalHarga += harga;
    totalHargaElem.textContent = `Total: Rp ${totalHarga.toLocaleString("id-ID")}`;
  }
});